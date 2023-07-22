-- Resource Metadata
fx_version 'cerulean'
games { 'rdr3', 'gta5' }

author 'Jaareet <contacto@jaareet.es>'
description 'A FiveM interface'
version '1.0.0'
lua54 'yes'

-- What to run
ui_page 'html/index.html'

files {
	'html/**/**/*.*'
}

client_scripts {
	'client/*.l*a',
}

-- Dependencies
dependencies {
	'es_extended',
	'esx_basicneeds',
	'esx_status'
}
