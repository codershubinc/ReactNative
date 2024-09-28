import com.yourapp.MusicInfoPackage; // Import your package

@Override
public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new MusicInfoPackage() // Register your package here
    );
}
