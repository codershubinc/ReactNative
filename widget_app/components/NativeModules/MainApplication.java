import com.widget.MusicInfoModule; // Import the module

@Override
public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new MusicInfoPackage() // Add your package here
    );
}
