package com.material.plugins.user;
import android.os.*;
import android.content.*;
import android.util.Log;
import android.content.res.Configuration;
import android.webkit.JavascriptInterface;
import java.io.*;
import java.lang.reflect.*;

public class Material
{
    public static String TAG = "Material";  
    private Method m_callscript;
    private Object m_parent;
    private Context m_ctx;

    // Constructor
    public Material() {
        Log.d(TAG, "Creating Material object");
    }

    // Initialize the plugin
    public void Init(Context ctx, Object parent) throws Exception {
        Log.d(TAG, "Initializing Material");

        m_ctx = ctx;
        m_parent = parent;

        // Use reflection to get the parent's method for calling JavaScript
        Log.d(TAG, "Getting CallScript method");
        m_callscript = parent.getClass().getMethod("CallScript", Bundle.class);
    }

    // Release the plugin resources
    public void Release() {
        Log.d(TAG, "Releasing Material resources");
    }

    // Handle configuration changes (theme changes)
    public void OnConfig(Configuration newConfig) {
        int currentNightMode = newConfig.uiMode & Configuration.UI_MODE_NIGHT_MASK;
        String mode = (currentNightMode == Configuration.UI_MODE_NIGHT_YES) ? "dark" : "light";

        // Log the theme change
        Log.d(TAG, "Theme changed to: " + mode);

        // Trigger the JavaScript callback to inform the theme change
        try {
            Bundle bundle = new Bundle();
            bundle.putString("cmd", "onThemeChanged");
            bundle.putString("mode", mode);  // Pass the current theme (dark/light)
            CallScript(bundle);
        } catch (Exception e) {
            Log.e(TAG, "Error calling script: " + e.getMessage());
        }
    }

    // Call the JavaScript function
    private void CallScript(Bundle b) throws Exception {
        m_callscript.invoke(m_parent, b);
    }

    // Handle commands from DroidScript
    public String CallPlugin(Bundle b) throws Exception {
        String cmd = b.getString("cmd");
        
        return null;
    }
}
