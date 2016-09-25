  _             _          
 (_)           (_)         
  _  ___  _ __  _  ___     
 | |/ _ \| '_ \| |/ __| 
 | | (_) | | | | | (__     
 |_|\___/|_| |_|_|\___|  CLI v2.0.0

=======================



[1m[32mstart [options] <PATH> [template][39m[22m [90m.............[39m  [1mStarts a new Ionic project in the specified PATH[22m
[1m                                                 [options] [22m[1many flags for the command[22m
[1m                                                 <PATH> [22m[1mdirectory for the new project[22m
[1m                                                 [template] [22m[1mStarter templates can either come from a named template, [22m
                                                            [1m(ex: tabs, sidemenu, blank),[22m
                                                            [1ma Github repo, a Codepen url, or a local directory.[22m
                                                            [1mCodepen url, ex: http://codepen.io/ionic/pen/odqCz[22m
                                                            [1mDefaults to Ionic "tabs" starter template[22m
[1m[33m      [--appname|-a]  [39m[22m[90m.........................[39m  [1mHuman readable name for the app (Use quotes around the name)[22m

[1m[33m      [--id|-i]  [39m[22m[90m..............................[39m  [1mPackage name for <widget id> config, ex: com.mycompany.myapp[22m

[1m[33m      [--skip-npm]  [39m[22m[90m...........................[39m  [1mSkip npm package installation[22m

[1m[33m      [--no-cordova|-w]  [39m[22m[90m......................[39m  [1mCreate a basic structure without Cordova requirements[22m

[1m[33m      [--sass|-s]  [39m[22m[90m............................[39m  [1mSetup the project to use Sass CSS precompiling[22m

[1m[33m      [--list|-l]  [39m[22m[90m............................[39m  [1mList starter templates available[22m

[1m[33m      [--io-app-id]  [39m[22m[90m..........................[39m  [1mThe Ionic.io app ID to use[22m

[1m[33m      [--template|-t]  [39m[22m[90m........................[39m  [1mProject starter template[22m

[1m[33m      [--v2|-v]  [39m[22m[90m..............................[39m  [1mStart a Ionic v2 project[22m

[1m[33m      [--zip-file|-z]  [39m[22m[90m........................[39m  [1mURL to download zipfile for starter template[22m

[1m[32mserve [options][39m[22m [90m...............................[39m  [1mStart a local development server for app dev/testing[22m
[1m[33m      [--consolelogs|-c]  [39m[22m[90m.....................[39m  [1mPrint app console logs to Ionic CLI[22m

[1m[33m      [--serverlogs|-s]  [39m[22m[90m......................[39m  [1mPrint dev server logs to Ionic CLI[22m

[1m[33m      [--port|-p]  [39m[22m[90m............................[39m  [1mDev server HTTP port (8100 default)[22m

[1m[33m      [--livereload-port|-r]  [39m[22m[90m.................[39m  [1mLive Reload port (35729 default)[22m

[1m[33m      [--nobrowser|-b]  [39m[22m[90m.......................[39m  [1mDisable launching a browser[22m

[1m[33m      [--nolivereload|-d]  [39m[22m[90m....................[39m  [1mDo not start live reload[22m

[1m[33m      [--noproxy|-x]  [39m[22m[90m.........................[39m  [1mDo not add proxies[22m

[1m[33m      [--address]  [39m[22m[90m............................[39m  [1mUse specific address or return with failure[22m

[1m[33m      [--all|-a]  [39m[22m[90m.............................[39m  [1mHave the server listen on all addresses (0.0.0.0)[22m

[1m[33m      [--browser|-w]  [39m[22m[90m.........................[39m  [1mSpecifies the browser to use (safari, firefox, chrome)[22m

[1m[33m      [--browseroption|-o]  [39m[22m[90m...................[39m  [1mSpecifies a path to open to (/#/tab/dash)[22m

[1m[33m      [--lab|-l]  [39m[22m[90m.............................[39m  [1mTest your apps on multiple screen sizes and platform types[22m

[1m[33m      [--nogulp]  [39m[22m[90m.............................[39m  [1mDisable running gulp during serve[22m

[1m[33m      [--platform|-t]  [39m[22m[90m........................[39m  [1mStart serve with a specific platform (ios/android)[22m

[1m[32msetup [sass][39m[22m [90m..................................[39m  [1mConfigure the project with a build tool [33m(beta)[39m[22m
[1m                                                 [sass] [22m[1mSetup the project to use Sass CSS precompiling[22m
[1m[32mgenerate[39m[22m [90m......................................[39m  [1mGenerate pages and components[22m
[1m[33m         [--list]  [39m[22m[90m............................[39m  [1mList available generators[22m

[1m[33m         [--typescript|--ts]  [39m[22m[90m.................[39m  [1m(with --v2 only) Use TypeScript in generation[22m

[1m[32mplatform <PLATFORM> [options][39m[22m [90m.................[39m  [1mAdd platform target for building an Ionic app[22m
[1m[33m         [--noresources|-r]  [39m[22m[90m..................[39m  [1mDo not add default Ionic icons and splash screen resources[22m

[1m[33m         [--nosave|-e]  [39m[22m[90m.......................[39m  [1mDo not save the platform to the package.json file[22m

[1m[32mrun <PLATFORM> [options][39m[22m [90m......................[39m  [1mRun an Ionic project on a connected device[22m
[1m[33m    [--livereload|-l]  [39m[22m[90m........................[39m  [1mLive reload app dev files from the device[33m (beta)[39m[22m

[1m[33m    [--address]  [39m[22m[90m..............................[39m  [1mUse specific address (livereload req.)[22m

[1m[33m    [--port|-p]  [39m[22m[90m..............................[39m  [1mDev server HTTP port (8100 default, livereload req.)[22m

[1m[33m    [--livereload-port|-r]  [39m[22m[90m...................[39m  [1mLive Reload port (35729 default, livereload req.)[22m

[1m[33m    [--consolelogs|-c]  [39m[22m[90m.......................[39m  [1mPrint app console logs to Ionic CLI (livereload req.)[22m

[1m[33m    [--serverlogs|-s]  [39m[22m[90m........................[39m  [1mPrint dev server logs to Ionic CLI (livereload req.)[22m

[1m[33m    [--debug|--release]  [39m[22m[90m......................[39m  [1m[22m

[1m[33m    [--device|--emulator|--target=FOO]  [39m[22m

[1m[32memulate <PLATFORM> [options][39m[22m [90m..................[39m  [1mEmulate an Ionic project on a simulator or emulator[22m
[1m[33m        [--livereload|-l]  [39m[22m[90m....................[39m  [1mLive reload app dev files from the device[33m (beta)[39m[22m

[1m[33m        [--address]  [39m[22m[90m..........................[39m  [1mUse specific address (livereload req.)[22m

[1m[33m        [--port|-p]  [39m[22m[90m..........................[39m  [1mDev server HTTP port (8100 default, livereload req.)[22m

[1m[33m        [--livereload-port|-r]  [39m[22m[90m...............[39m  [1mLive Reload port (35729 default, livereload req.)[22m

[1m[33m        [--consolelogs|-c]  [39m[22m[90m...................[39m  [1mPrint app console logs to Ionic CLI (livereload req.)[22m

[1m[33m        [--serverlogs|-s]  [39m[22m[90m....................[39m  [1mPrint dev server logs to Ionic CLI (livereload req.)[22m

[1m[33m        [--debug|--release]  [39m[22m[90m..................[39m  [1m[22m

[1m[33m        [--device|--emulator|--target=FOO]  [39m[22m

[1m[32mbuild <PLATFORM> [options][39m[22m [90m....................[39m  [1mBuild (prepare + compile) an Ionic project for a given platform.
[22m
[1m[33m      [--nohooks|-n]  [39m[22m[90m.........................[39m  [1mDo not add default Ionic hooks for Cordova[22m

[1m[32mplugin add [options] <SPEC>[39m[22m [90m...................[39m  [1mAdd a Cordova plugin[22m
[1m                                                 <SPEC> [22m[1mCan be a plugin ID, a local path, or a git URL.[22m
[1m[33m       [--searchpath <directory>]  [39m[22m[90m............[39m  [1mWhen looking up plugins by ID, look in this directory[22m
                                                 [1mand subdirectories first for the plugin before[22m
                                                 [1mlooking it up in the registry.[22m

[1m[33m       [--nosave|-e]  [39m[22m[90m.........................[39m  [1mDo not save the plugin to the package.json file[22m

[1m[32mresources[39m[22m [90m.....................................[39m  [1mAutomatically create icon and splash screen resources[33m (beta)[39m
		      Put your images in the ./resources directory, named splash or icon.
		      Accepted file types are .png, .ai, and .psd.
		      Icons should be 192x192 px without rounded corners.
		      Splashscreens should be 2208x2208 px, with the image centered in the middle.
[22m
[1m[33m          [--icon|-i]  [39m[22m[90m........................[39m  [1mGenerate icon resources[22m

[1m[33m          [--splash|-s]  [39m[22m[90m......................[39m  [1mGenerate splash screen resources[22m

[1m[32mupload[39m[22m [90m........................................[39m  [1mUpload an app to your Ionic account[22m
[1m[33m       [--email|-e]  [39m[22m[90m..........................[39m  [1mIonic account email[22m

[1m[33m       [--password|-p]  [39m[22m[90m.......................[39m  [1mIonic account password[22m

[1m[33m       [--note]  [39m[22m[90m..............................[39m  [1mThe note to signify the upload[22m

[1m[33m       [--deploy <channel_tag>]  [39m[22m[90m..............[39m  [1mDeploys the upload to the given channel. Defaults to the Dev channel[22m

[1m[32mshare <EMAIL>[39m[22m [90m.................................[39m  [1mShare an app with a client, co-worker, friend, or customer[22m
[1m                                                 <EMAIL> [22m[1mThe email to share the app with[22m
[1m[32mlib [options] [update][39m[22m [90m........................[39m  [1mGets Ionic library version or updates the Ionic library[22m
[1m                                                 [update] [22m[1mUpdates the Ionic Framework in www/lib/ionic[22m
[1m[33m    [--version|-v]  [39m[22m[90m...........................[39m  [1mSpecific Ionic version[22m
                                                 [1mOtherwise it defaults to the latest version[22m

[1m[32mio <command>[39m[22m [90m..................................[39m  [1mIntegrate your app with the ionic.io platform services [31m(alpha)[39m[22m
[1m                                                 <command> [22m[1m[33minit[39m[22m
[1m[32msecurity <command> [options][39m[22m [90m..................[39m  [1mStore your app's credentials for the Ionic Platform [31m(alpha)[39m[22m
[1m                                                 <command> [22m[1m[33mprofiles list[39m, [33mprofiles add "<name>"[39m, [33mcredentials android[39m, or [33mcredentials ios[39m[22m
[1m[33m         [--profile <tag>]  [39m[22m[90m...................[39m  [1m([33mcredentials <platform>[39m) Specify the profile on which these credentials are saved[22m

[1m[33m         [--keystore|-s <path>]  [39m[22m[90m..............[39m  [1m([33mcredentials android[39m) Specify the location of your keystore file[22m

[1m[33m         [--keystore-password|-p <password>]  [39m[22m[90m.[39m  [1m([33mcredentials android[39m) Specify your keystore password (exclude for prompt)[22m

[1m[33m         [--key-alias|-k <alias>]  [39m[22m[90m............[39m  [1m([33mcredentials android[39m) Specify your key alias for this app[22m

[1m[33m         [--key-password|-w <password>]  [39m[22m[90m......[39m  [1m([33mcredentials android[39m) Specify your key password for this app (exclude for prompt)[22m

[1m[33m         [--cert|-c <path>]  [39m[22m[90m..................[39m  [1m([33mcredentials ios[39m) Specify the location of your .p12 file[22m

[1m[33m         [--cert-password|-p <password>]  [39m[22m[90m.....[39m  [1m([33mcredentials ios[39m) Specify your certificate password (exclude for prompt)[22m

[1m[33m         [--provisioning-profile|-r <path>]  [39m[22m[90m..[39m  [1m([33mcredentials ios[39m) Specify the location of your .mobileprovision file[22m

[1m[32mpush[39m[22m [90m..........................................[39m  [1mUpload APNS and GCM credentials to Ionic Push [31m(alpha)[39m[22m
[1m[33m     [--ios-dev-cert]  [39m[22m[90m........................[39m  [1mUpload your development .p12 file to Ionic Push[22m

[1m[33m     [--ios-prod-cert]  [39m[22m[90m.......................[39m  [1mUpload your production .p12 file to Ionic Push[22m

[1m[33m     [--production-mode=y,n]  [39m[22m[90m.................[39m  [1mTell Ionic Push to use production (y) or sandbox (n) APNS servers[22m

[1m[33m     [--google-api-key <your-gcm-api-key>]  [39m[22m[90m...[39m  [1mSet your app's GCM API key on Ionic Push[22m

[1m[32mpackage <command> [options][39m[22m [90m...................[39m  [1mUse Ionic Package to build your app [31m(alpha)[39m[22m
[1m                                                 <command> [22m[1m[33mbuild android[39m, [33mbuild ios[39m, [33mlist[39m, [33minfo[39m, or [33mdownload[39m[22m
[1m[33m        [--release]  [39m[22m[90m..........................[39m  [1m([33mbuild <platform>[39m) Mark this build as a release[22m

[1m[33m        [--profile|-p <tag>]  [39m[22m[90m.................[39m  [1m([33mbuild <platform>[39m) Specify the Security Profile to use with this build[22m

[1m[33m        [--noresources]  [39m[22m[90m......................[39m  [1m([33mbuild <platform>[39m) Do not generate icon and splash screen resources during this build[22m

[1m[33m        [--destination|-d <path>]  [39m[22m[90m............[39m  [1m([33mdownload[39m) Specify the destination directory to download your packaged app.[22m

[1m[32mconfig <command> [key] [value][39m[22m [90m................[39m  [1mSet configuration variables for your ionic app [31m(alpha)[39m[22m
[1m                                                 <command> [22m[1m[33mset[39m, [33munset[39m, [33mbuild[39m, or [33minfo[39m[22m
[1m                                                 [key] [22m[1mThe key to set[22m
[1m                                                 [value] [22m[1mThe value to set[22m
[1m[32mservice add [options] <SPEC>[39m[22m [90m..................[39m  [1mAdd an Ionic service package and install any required plugins[22m
[1m                                                 <SPEC> [22m[1mCan be a service name or a git url[22m
[1m[32madd [name][39m[22m [90m....................................[39m  [1mAdd an Ion, bower component, or addon to the project[22m
[1m                                                 [name] [22m[1mThe name of the ion, bower component, or addon you wish to install[22m
[1m[32mremove [name][39m[22m [90m.................................[39m  [1mRemove an Ion, bower component, or addon from the project[22m
[1m                                                 [name] [22m[1mThe name of the Ion, bower component, or addon you wish to remove[22m
[1m[32mlist[39m[22m [90m..........................................[39m  [1mList Ions, bower components, or addons in the project[22m
[1m[32minfo[39m[22m [90m..........................................[39m  [1mList information about the users runtime environment[22m
[1m[32mhelp [command][39m[22m [90m................................[39m  [1mProvides help for a certain command[22m
[1m                                                 [command] [22m[1mThe command you desire help with[22m
[1m[32mlink [appId][39m[22m [90m..................................[39m  [1mSets your Ionic App ID for your project[22m
[1m                                                 [appId] [22m[1mThe app ID you wish to set for this project[22m
[1m[33m     [--reset|-r]  [39m[22m[90m............................[39m  [1mThis will reset the Ionic App ID[22m

[1m[32mhooks [add|remove|permissions|perm][39m[22m [90m...........[39m  [1mManage your Ionic Cordova hooks[22m
[1m                                                 [add|remove|permissions|perm] [22m[1mAdd, remove, or modify permissions on the default Ionic Cordova hooks[22m
[1m[32mstate <COMMAND>[39m[22m [90m...............................[39m  [1mSaves or restores state of your Ionic Application using the package.json file[22m
[1m                                                 <COMMAND> [22m[1m[ save | restore | clear | reset ][22m
[1m[33m      [save]  [39m[22m[90m.................................[39m  [1mSave the platforms and plugins into package.json[22m

[1m[33m      [restore]  [39m[22m[90m..............................[39m  [1mRestore the platforms and plugins from package.json[22m

[1m[33m      [clear]  [39m[22m[90m................................[39m  [1mClear the package.json of cordovaPlugins and cordovaPlatforms, as well as clear out the platforms and plugins folders[22m

[1m[33m      [reset]  [39m[22m[90m................................[39m  [1mClear out the platforms and plugins directories, and reinstall plugins and platforms[22m

[1m[33m      [--plugins]  [39m[22m[90m............................[39m  [1mOnly do operations with plugins[22m

[1m[33m      [--platforms]  [39m[22m[90m..........................[39m  [1mOnly do operations with platforms[22m

[1m[32mdocs <TOPIC>[39m[22m [90m..................................[39m  [1mOpens up the documentation for Ionic[22m
[1m                                                 <TOPIC> [22m[1mthe topic to view help documentation for. Use "ls" to view all topics[22m

