const hsv2rgb = function( hsv ) {
    var h = hsv[0] / 60 ;
    var s = hsv[1] ;
    var v = hsv[2] ;
    if ( s == 0 ) return [ v * 255, v * 255, v * 255 ] ;

    var rgb ;
    var i = parseInt( h ) ;
    var f = h - i ;
    var v1 = v * (1 - s) ;
    var v2 = v * (1 - s * f) ;
    var v3 = v * (1 - s * (1 - f)) ;
    
    switch( i ) {
          case 0 :
            case 6 :
              rgb = [ v, v3, v1 ] ;
            break ;

            case 1 :
              rgb = [ v2, v, v1 ] ;
            break ;

            case 2 :
              rgb = [ v1, v, v3 ] ;
            break ;

            case 3 :
              rgb = [ v1, v2, v ] ;
            break ;

            case 4 :
              rgb = [ v3, v1, v ] ;
            break ;

            case 5 :
              rgb = [ v, v1, v2 ] ;
            break ;
          }

    return rgb.map( function ( value ) {
          return parseInt(value * 255);
        } ) ;
}

export default ({},inject) => {
  inject("hsv2rgb",hsv2rgb)
}
