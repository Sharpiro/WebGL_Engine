@echo off
SET workSrcDir="C:\Users\U403598\Documents\_Work\Learning\Development\Javasript\WebGL_Engine-master\Engine_Core\src\shaders"
SET workDestDir="c:\websites\static_content\shaders"
SET homeSrcDir="D:\Git_Base\WebGL_Engine\Engine_Core\src\shaders"
SET homeDestDir="D:\websites\static_content\shaders"

IF exist %workDestDir% (
	echo WORK
	xcopy /s /Y  %workSrcDir% %workDestDir%
) ELSE (
	echo HOME
	xcopy /s /Y  %homeSrcDir% %homeDestDir%
)