IP="$(hostname -i | awk '{print $2}')"
firefox "http://$IP:1313"
hugo serve -D --bind "$IP" --baseURL "http://$IP/" 




