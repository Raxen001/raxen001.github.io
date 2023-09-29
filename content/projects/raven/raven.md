---
title: "Raven"
date: 2023-09-06T15:45:01+05:30
draft: true
banimg: "raven.jpg"
customcss: "blog.css"
---

# Home media server

I was bored and wanted to created my own personal netflix at home. So, naturally i wanted some kind of hardware that can run a media server
Fortunately, I had a spare laptop lying around a toshiba ![toshiba](laptop.jpg).

## specs

![Neofetch](../neofetch.png)
Not too shabby if i say so myself.

## STEP 0

### OS of choice

Nowadays we have gotten a lot of options for installing an operating system that is server ready and usable to the user.
meaning i have gottent a lot of options. I have experience running a Arch linux system for the past 2 years and Fedora system
for about 6 months. I only ever used a debian based distro when i was dipping my toes into linux and that was about 3.5 years back
So, i decided why not try [Debian 12](https://debian.org) (book work).
Everyone priased it as a rock solid distro with amazing performance and stability.

## STEP 1

### DOWNLOADING OS

I went with the torrent download of the _ISO_ file. Since, it will be faster. I chose the netinstaller cause i couldn't find the normal one or there wasn't one idk.
Netinstaller worked well in my case as the internet in my home good enough that most the software it needed to download didn't take long. It may not be suitable for
someone living in a slow internet location.

### FLASHING OS

You need to flash the usb stick with the os of your choice.

It was fairly straightforward all you ever need to install a linux distro is usb stick that is ideally above 4gb of storage capacity.
You can use _rufus_ or media creation tool of your choice.

For Linux users you have a lot of choice you can do something like
`dd if=debian.iso of=/dev/sdb bs=4M status=progress` **i made it up from memory don't copy paste**
or use the `cat` command or use media creation tool already present in your Operating System if your running a normie distro.

#### RECOMMENDED

I chose to go with [ventoy](https://www.ventoy.net) it is awesome as it allows me to have multiple linux distros in a same usb.
It is as simple as setting up ventoy in the usb and then dragging and dropping your ISOs into the Ventoy folder.
**HIGHLY RECOMMENDED\***

Once the usb is flashed properly now we need to boot from it

### BOOTING

Booting from the usb is fairly simple.
While booting you simply have to hold down the button that makes it go into the UEFI / BIOS menu.
It was _F2_ for me.
Once insde the UEFI menu [UEFI_MENU](../uefi_menu.jpg) go to

In boot menu

- navigate to SECURITY TAB and **Disable** _SECURE BOOT_
- Optionally Change Boot order so USB comes first

At this point i had keyboard issues. A lot of keys in the laptop stopped working.
So, i had to improvise. **Numpad arrow right** and **Numpad arrow up** worked. **Left arrow** and **Down arrow** Worked. **F2** worked

I had to go to windows and press _SHIFT_ and restart to go into Boot Menu.
These workarounds are specific to the laptop i had. Your case may vary.

Select the OS you want to install from USB.

## STEP 2

### INSTALLING OS

I am gonna skip all the steps here. it is pretty straightforward.
The installation wizards will ask you stuff and you have to click a few buttons.

## STEP 3

### Installing DOCKER

What is docker ?

Docker is a containerization platform unlike virtual machines where all the components of the system are simulated. Here the host kernel is used by the container.
Long story short. Virtual machines have performance hit. Docker not so much. Makes it ideal for my old laptop.

The docker website has some good documentations and ways to make docker install very easy.
[docker-installation](https://docs.docker.com/engine/install/debian/)
easy installation

##### Remove if installed previous

`for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done`

#### install fresh

##### set up apt repo

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

##### install package

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### There are few additional steps you might need to do to make docker run as non root user

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

Log out and log back in

Enable auto start up of docker service

```bash
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

## Applications that i am currently using

Most the docker images i am using are from
[linuxserver](https://www.linuxserver.io/)
They have the docker compose for everything. Which makes it very easy for me to copy paste everything

- [qBittorrent](#qBittorrent)
- [Jellyfin](#Jellyfin)
- [Jellyseerr](#Jellyseerr)
- [prowlarr](#prowlarr)
- [lidarr](#lidarr)
- [sonarr](#sonarr)
- [radarr](#radarr)
- [heimdall](#heimdall)
- [ip2cam](#ip2cam)

### qBittorrent

qBittorrent is an open source bittorrent downloader. It allows for webui to manage it.
sweet.

![Qbittorrent](../qbit.png)

setting it up is easy. Go to settings -> enable webui

as you can see from the image below i have added my tailscale ip to the whitelist so i don't need to authentiate using username and password.

![qbit-admin](../qbit-admin.png)

### Jellyfin

Media server to serve all the medias you _legally own_

Jellyfin allows you to serve all the media you _legally own_. Rip Your own stuff
![home](../jel-home.png)
Jellyfin allows you to have transcoding when possible to allow hardware acceleration
go to Settings -> dashboard -> playback -> vaapi
![hardware-acceleration](../jel-hw.png)
![syncplay](../jel-syn1.png)
![syncplay](../jel-syn2.png)
![syncplay](../jel-syn3.png)

### Jellyseerr

Jellyseer allows the users you are serving the jellyfin to request you media they want to see.
It is a media requesting thingy. it is quite nice ;) _wink wink_

![jellyseerr](../jellyseerr.png)

### prowlarr

Say if you want to download linux isos but there are like 1000 sites.
this is where prowlarr comes in. this will help you search through all the sites that provide linux isos.

![prowlarr](../prowlarr.png)

### lidarr

ok enough with the linux isos pun. lidarr helps you with keeping you up with your music needs. It allows you track Artist. It tracks all the albums you already have and any upcoming ones. It will automatically download them and rename them. **You goto enable rename files**
![lidarr](../lidarr.png)

### sonarr

same stuff but for TV Shows. This lets you track all the shows you watch and keep them organised
![sonarr](../sonarr.png)

### radarr

To keep track of all your Movies.
![radarr](../radarr.png)

### heimdall

Having lot of applciations running on your server can quickly become a hassle to keep track of.
You gonna need some kind of link list. Why not go for a homepage. It talks with most the popular homelab applications and puts it on the homepage
![homepage](../heimdall.png)

### ip2cam

This is one the few fun things i wanted to do. This basically allows you to stream your webcam.

![cam2ip](../cam2ip.png)

### Final docker compose

```yml
---
version: "3.8"
services:
  heimdall:
    image: linuxserver/heimdall
    container_name: heimdall
    volumes:
      - ~/heimdall/config:/config
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Kolkata
    ports:
      - 80:80
      - 443:443
    restart: unless-stopped

  jellyfin:
    image: lscr.io/linuxserver/jellyfin:latest
    container_name: jellyfin
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Kolkata
    devices:
      - "/dev/dri/renderD128:/dev/dri/renderD128"
    volumes:
      - ~/jellyfin/config:/config
      - ~/jellyfin/cache:/cache
      - ~/media/tvshows:/data/tvshows
      - ~/media/movies:/data/movies
      - ~/media/music:/data/music
      - ~/media/anime:/data/anime
    ports:
      - 8096:8096
    restart: unless-stopped

  camip:
    image: gen2brain/cam2ip
    container_name: cam2ip
    devices:
      - "/dev/video0:/dev/video0"
    ports:
      - 56000:56000

  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent:latest
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Kolkata
      - WEBUI_PORT=8080
    volumes:
      - ~/qbittorrent/config:/config
      - ~/Downloads:/downloads
      - ~/media:/media
    ports:
      - 8080:8080
      - 6881:6881
      - 6881:6881/udp
    restart: unless-stopped

  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: prowlarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Kolkata
    volumes:
      - ~/prowlarr/config:/config
    ports:
      - 9696:9696
    restart: unless-stopped

  sonarr:
    image: lscr.io/linuxserver/sonarr:latest
    container_name: sonarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Kolkata
    volumes:
      - ~/sonarr/config:/config
      - ~/media/tvshows:/tv
      - ~/media/anime:/anime
      - ~/Downloads:/downloads
    ports:
      - 8989:8989
    restart: unless-stopped

  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: radarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Kolkata
    volumes:
      - ~/radarr/config:/config
      - ~/media/movies:/movies
      - ~/Downloads:/downloads
    ports:
      - 7878:7878
    restart: unless-stopped

  jellyseerr:
    image: fallenbagel/jellyseerr:latest
    container_name: jellyseerr
    environment:
      - LOG_LEVEL=debug
      - TZ=Asia/Kolkata
    ports:
      - 5055:5055
    volumes:
      - ~/jellyseerr/config:/app/config
    restart: unless-stopped

  lidarr:
    image: lscr.io/linuxserver/lidarr:latest
    container_name: lidarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Kolkata
    volumes:
      - ~/lidarr/config:/config
      - ~/media/music:/music
      - ~/Downloads:/downloads
    ports:
      - 8686:8686
    restart: unless-stopped
```

## Installing Tailscale

I wanted to access my machine even when i was out of the house. So, you can either use
port forwarding to acces it from anywhere which was impossible as my ISP has CGNAT or Double NAT.
So, i decided go with [Tailscale](https://tailscale.com) an atlernative was zerotier. But i didn't know what the differece was
so i went with tailscale. Basically it creates a mesh network where an extra network card showd up in your machince and you can access your remote devices as if they were present in your localmachine

```bash
4: tailscale0: <POINTOPOINT,MULTICAST,NOARP,UP,LOWER_UP> mtu 1280 qdisc fq_codel state UNKNOWN group default qlen 500
    link/none
    inet 100.117.79.111/32 scope global tailscale0
       valid_lft forever preferred_lft forever
    inet6 fd7a:115c:a1e0:ab12:4843:cd96:6275:4f6f/128 scope global
       valid_lft forever preferred_lft forever
    inet6 fe80::9c38:ed45:1929:4ec/64 scope link stable-privacy
       valid_lft forever preferred_lft forever
```

It is pretty easy to setup.

### SIGN UP TO TAILSCALE

Login in to your tailscale account Or create a new one.

### Click on add devices.

Follow the steps.
in my case since i am using Debian it was

```
curl -fsSL https://pkgs.tailscale.com/stable/debian/bookworm.noarmor.gpg | sudo tee /usr/share/keyrings/tailscale-archive-keyring.gpg >/dev/null
curl -fsSL https://pkgs.tailscale.com/stable/debian/bookworm.tailscale-keyring.list | sudo tee /etc/apt/sources.list.d/tailscale.list
sudo apt-get update
sudo apt-get install tailscale
sudo tailscale up
```

Once installing gets completed an url will pop. Navigate to that url and sign in.
And you are done

### DONE

Now you can access your devices from anywhere.
Since, it is a mesh network. There is to data limit. as Data isn't going through Tailscale servers.
They only helping in making the mesh network.

# NOTES

## TODO

script to make it so i can be reproducible everywhere
tailscale funnel to share it with friends
