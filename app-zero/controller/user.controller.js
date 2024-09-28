import { asyncHandler } from "@/util/asyncHandler.js"
import { ApiError } from "@/util/error.api.js";
import { User } from "@/model/user.model.js"
import { ApiResponse } from "@/util/responce.api.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    //validation -not empty
    // is user already registered
    //check for image  , check for avatar
    //upload them to cloudinary
    //create user object- create entry in db  
    //remove pass and refresh token field from user object
    //check if user creation
    //return res 


    const { username, email, password, fullName } = req.body
    if ([username, email, password, fullName].some((field) => field?.trim() === "")) {
        throw new ApiError("All fields are required", 400)
    }
    console.log('req files', req.files);

    //check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(400, "User already exists with this username or email",)
    }




    const user = await User.create(
        {
            fullName,
            username: username.toLowerCase(),
            email,
            password,
            avatar: avatar.url,
            avatarId: avatar.public_id,
            coverImage: coverImage?.url || '',
            coverImageId: coverImage?.public_id || ''
        }
    )

    const findUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!findUser) {
        throw new ApiError("User registration failed", 500)

    }

    return res.status(201).json(
        new ApiResponse(
            200,
            findUser,
            "User created successfully"
        )
    )




})
const loginUser = asyncHandler(async (req, res) => {

    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { email, username, password } = req.body
    console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")

    // }
    const userFinding = await User.findOne({
        $or: [{ username }, { email }]
    })

    const userFindingPass = await User.findOne({
        $or: [{ username }, { email }]
    })

    console.log('userFindingPass', userFindingPass);

    if (!userFinding) {
        throw new ApiError(404, "User does not exist")
    }
    console.log(userFinding);
    const isPasswordValid = await userFinding.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(userFinding._id)

    const loggedUser = await User.findById(userFinding._id).select("-password -refreshToken")

    const option = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
        .cookie(
            "accessToken", accessToken, option
        ).cookie(
            "refreshToken", refreshToken, option
        ).json(
            new ApiResponse(
                200,
                {
                    user: loggedUser, accessToken, refreshToken
                },
                "User logged in successfully"

            )
        )


})

const logoutUser = asyncHandler(async (req, res) => {

    User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }, {
        new: true
    }
    )

    const option = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
        .cookie(
            "accessToken", "", option
        ).cookie(
            "refreshToken", "", option
        ).json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {

        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?.id)

        if (!user) {
            throw new ApiError(404, "Invalid Refresh Token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is expired or invalid")
        }

        const option = {
            httpOnly: true,
            secure: true,
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

        return res
            .status(200)
            .cookie(
                "accessToken", accessToken, option
            ).cookie(
                "refreshToken", refreshToken, option
            ).json(
                new ApiResponse(
                    200,
                    {
                        accessToken, refreshToken
                    },
                    "Access and Refresh Token generated successfully"
                )
            )
    } catch (error) {
        throw new ApiError(401, error.message || "Something went wrong while generating access and refresh token")
    }

})

const changeCurrentUserPassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body
    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "oldPassword and newPassword are required")
    }
    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isOldPasswordCorrect) {
        throw new ApiError(401, "Invalid old password")
    }
    user.password = newPassword

    await user.save({ validateBeforeSave: false })

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password changed successfully"
        )
    )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: req.user
            },
            "User fetched successfully"
        )
    )
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { username, email } = req.body
    if (!username || !email) {
        throw new ApiError(400, "username and email are required")
    }
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                username,
                email
            }

        }, { new: true }
    ).select("-password -refreshToken")

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user
            },
            "Account details updated successfully"
        )
    )

})

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path


    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar) {
        throw new ApiError(500, "Something went wrong while uploading avatar")

    }
    console.log("avatar updated", avatar);

    console.log('deleting old avatar', req.user?.avatarId);
    const deletedAvatar = await deleteOnCloudinary(req.user?.avatarId)
    console.log("deleted avatar", deletedAvatar);




    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url,
                avatarId: avatar.public_id
            }
        }, { new: true }
    ).select("-password -refreshToken")
    const resizedImage = resizeImage(user?.avatarId)
    console.log("resizedImage", resizedImage);
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user
            },
            "Avatar updated successfully"
        )
    )
})

const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "coverImage is required")
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage) {
        throw new ApiError(500, "Something went wrong while uploading coverImage")

    }

    console.log("coverImage updated", coverImage);

    console.log('deleting old coverImage', req.user?.coverImageId);
    const deletedCoverImage = await deleteOnCloudinary(req.user?.coverImageId)
    console.log("deleted coverImage", deletedCoverImage);

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url,
                coverImageId: coverImage.public_id
            }
        }, { new: true }
    ).select("-password -refreshToken")
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user
            },
            "CoverImage updated successfully"
        )
    )
})

const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params
    if (!username?.trim()) {
        throw new ApiError(400, "username is required")
    }

    const channel = await User.aggregate([
        {
            $match: {
                username: username.toLowerCase()
            }
        }, {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        }, {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        }, {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false
                    }
                }
            }
        }, {
            $project: {
                fullName: 1,
                username: 1,
                avatar: 1,
                coverImage: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1
            }
        }



    ])

    if (!channel?.length) {
        throw new ApiError(400, "Channel not found")
    }


    return res.status(200).json(
        new ApiResponse(
            200,
            channel[0]
            ,
            "Channel fetched successfully"
        )
    )





})

const getUserWatchHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user?._id)
            }
        }, {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    }
                ]
            },

        }, {
            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }
        }
    ])


    return res.status(200).json(
        new ApiResponse(
            200,
            user[0].watchHistory
            ,
            "Watch History fetched successfully"
        )
    )
})



export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentUserPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getUserWatchHistory


}