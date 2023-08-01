IP="$(hostname -i | awk '{print $2}')"
hugo serve -D --bind "$IP" --baseURL "http://$IP/" 




