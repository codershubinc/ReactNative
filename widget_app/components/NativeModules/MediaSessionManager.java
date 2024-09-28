package com.yourapp;

import android.content.Context;
import android.media.session.MediaController;
import android.media.session.MediaSessionManager;
import android.media.session.PlaybackState;
import android.os.Build;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.util.List;

public class MusicInfoModule extends ReactContextBaseJavaModule {

    public MusicInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MusicInfo";
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @ReactMethod
    public void getCurrentPlayingTrack(Promise promise) {
        MediaSessionManager mediaSessionManager = (MediaSessionManager) getReactApplicationContext().getSystemService(Context.MEDIA_SESSION_SERVICE);
        List<MediaController> controllers = mediaSessionManager.getActiveSessions(null);

        for (MediaController controller : controllers) {
            if (controller.getPlaybackState().getState() == PlaybackState.STATE_PLAYING) {
                String title = controller.getMetadata().getString(android.media.MediaMetadata.METADATA_KEY_TITLE);
                String artist = controller.getMetadata().getString(android.media.MediaMetadata.METADATA_KEY_ARTIST);
                promise.resolve(title + " by " + artist);
                return;
            }
        }

        promise.reject("NoTrackPlaying", "No music is currently playing");
    }
}
