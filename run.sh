IP="$(hostname -I | awk '{print $1}')"
xdg-open "http://$IP:1313"
hugo serve -D --navigateToChanged --bind "$IP" --baseURL "http://$IP/"
