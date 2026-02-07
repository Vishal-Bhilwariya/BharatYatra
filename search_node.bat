@echo off
echo Searching for node.exe in C:\Users\hp... > search_log.txt
where /r "C:\Users\hp" node.exe >> search_log.txt 2>&1
echo ======================================== >> search_log.txt
echo Searching for node.exe in C:\Program Files... >> search_log.txt
where /r "C:\Program Files" node.exe >> search_log.txt 2>&1
