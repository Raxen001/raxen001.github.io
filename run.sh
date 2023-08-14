IP="$(hostname -I | awk '{print $1}')"
firefox "http://$IP:1313"
hugo serve -D --bind "$IP" --baseURL "http://$IP/" 




