@echo off
echo USERNAME=%USERNAME% > execution_log.txt
echo PATH=%PATH% >> execution_log.txt
echo ======================================== >> execution_log.txt
echo WHERE NODE: >> execution_log.txt
where node >> execution_log.txt 2>&1
echo ======================================== >> execution_log.txt
echo DIR Program Files nodejs: >> execution_log.txt
dir "C:\Program Files\nodejs" >> execution_log.txt 2>&1
echo ======================================== >> execution_log.txt
echo DIR Program Files (x86) nodejs: >> execution_log.txt
dir "C:\Program Files (x86)\nodejs" >> execution_log.txt 2>&1
echo ======================================== >> execution_log.txt
echo DIR AppData Roaming npm: >> execution_log.txt
dir "%APPDATA%\npm" >> execution_log.txt 2>&1
echo ======================================== >> execution_log.txt
echo NODE VERSION CHECK: >> execution_log.txt
node -v >> execution_log.txt 2>&1
echo npm VERSION CHECK: >> execution_log.txt
npm -v >> execution_log.txt 2>&1
