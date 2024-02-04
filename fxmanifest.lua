fx_version 'cerulean'
games { 'gta5' }

author 'Rovelt'
description 'Keypad script'
version '1.0'

exports {
    "CheckCode"
}

ui_page 'HTML/index.html'

files {
    'html/index.html',
    'html/app.js',
    'html/style.css',
}

client_scripts {
    'client/*.lua',
}


lua54 'yes'