IP="$(hostname -i | awk '{print $3}')"
hugo serve -D --bind "$IP" --baseURL "http://$IP/" 




