'use client'

import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { useState } from 'react'

export default function GoogleMaps() {
    const [selected, setSelected] = useState(false)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'YOUR_API_KEY',
      })

    const place = {
        name: 'The H Tower',
        address:
            'Jl. H. R. Rasuna Said No.20, RT.1/RW.5, Karet Kuningan, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12940',
        latitude: -6.219704457801784,
        longitude: 106.83200170860196,
    }
    return (
        <GoogleMap
            center={{
                lat: place.latitude,
                lng: place.longitude
            }}
            zoom={13}
        >
            <MarkerF
                position={{
                    lat: place.latitude,
                    lng: place.longitude,
                }}
                onClick={() => {
                    setSelected(true)
                }}
            />
            {selected && (
                <InfoWindowF
                position={{
                    lat: place.latitude,
                    lng: place.longitude,
                }}
                zIndex={1}
                options={{
                    pixelOffset: {
                        width: 0,
                        height: -40,
                    }
                }}
                >
                    <p>hey</p>
                </InfoWindowF>
            )}
        </GoogleMap>
    )
}
