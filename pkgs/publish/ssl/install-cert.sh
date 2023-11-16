#!/usr/bin/env bash

CURRENT_DIR=${0%/*}

if [[ "$OSTYPE" == "darwin"* ]]; then
    CERT_INSTALLED=$(security find-certificate -c "Pessl Apps")
    if [[ "$CERT_INSTALLED" == "" ]]; then
        echo "🔐 SSL certificate for local dev proxy not installed"
        echo "🔐 Please enter your password when prompted to install and trust the certificate. You might need to restart your browser."
        sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain $CURRENT_DIR/proxy.cer
    fi
elif [[ "$OSTYPE" == "linux-gnu" ]]; then

    cat << EOF

    Install SSL on Chrome Linux 🐧
    ==============================
    For Chrome on Linux or Linux on Windows via WSL follow the instructions below to install "pkgs/vite/scripts/ssl/proxy.cer":

    1. In Chrome, open the menu in the top right corner and click "Settings."
    2. In the Chrome settings, select "Privacy and security > Manage Device Certificates".
    3. In the "Manage Device Certificates" dialog, go to the "[Trusted Root Certification] Authorities" tab and click the "Import" button.
    4. Click "Browse" and select the "pkgs/vite/scripts/ssl/proxy.cer". Then click "Select."
    5. Select the option Trust this certificate for identifying websites.
    6. Click OK.  "org-Pessl" should now appear on the list of certificate authorities.
    7. Restart Chrome.

EOF

else
    echo 'SSL warning: install "pkgs/vite/scripts/ssl/proxy.cer" to ensure dev-proxy works correctly'
fi

