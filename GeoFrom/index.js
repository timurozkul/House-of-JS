
$(document).ready((e)=> {
    // Fetch postcode
    $('#postcode').keyup(() => {
        getLocation( $('[name=postcode]').val());
    });

    // Submit form
    $('#submit').click( (event) => {
        event.preventDefault();
        $('.errorMessage').removeClass('show');

        let user = {
            firstName: $('[name=firstName]').val(),
            lastName: $('[name=lastName]').val(),
            email: $('[name=email]').val(),
            phoneNumber: $('[name=phoneNumber]').val(),
            country: $('[name=country]').val(),
            city: $('[name=city]').val(),
            postcode: $('[name=postcode]').val(),
            address1: $('[name=address1]').val(),
            additionalInfo: $('[name=additionalInfo]').val(),
            latitude: $('[name=latitude]').val(),
            longitude: $('[name=longitude]').val()
        };

        getLocation(user.postcode);

        errorText(validate.name(user.firstName), "#firstNameError");
        errorText(validate.name(user.lastName), "#lastNameError");
        errorText(validate.email(user.email), "#emailError");
        errorText(validate.phoneNumber(user.phoneNumber), "#phoneError");
        errorText(validate.country(user.country), "#countryError");
        errorText(validate.city(user.city), "#cityError");
        errorText(validate.postcode(user.postcode), "#postcodeError");
        errorText(validate.address(user.address1), "#addressError");

        if(user.latitude || user.longitude) {
            errorText(validate.latitude(user.latitude), "#latitudeError");
            errorText(validate.longitude(user.longitude), "#longitudeError");
        }
    });
});


function getLocation(postcode){
    $.ajax({
        type: "GET",
        url: 'http://maps.googleapis.com/maps/api/geocode/json?address=postcode=' + postcode + '&sensor=false',
        data: {},
        dataType: "text",
        success: (resultData) => {
            let resulData =  JSON.parse(resultData);
            if(resulData.status === "OK") {
                let latLng = resulData.results[0].geometry.location;
                getAddress(latLng.lat, latLng.lng);
            }
        }
    });
}

function getAddress (lat, lng) {
    $.ajax({
        type: "GET",
        url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=false',
        data: {},
        dataType: "text",
        success: (resultData) => {
            fillAddressForm(JSON.parse(resultData));
        }
    });
}

function fillAddressForm(addressObj) {
    let address1 = addressObj.results[1].address_components[1].long_name;
    let address2 = addressObj.results[1].address_components[0].long_name;
    let city = addressObj.results[1].address_components[2].long_name;
    let country = addressObj.results[1].address_components[6].long_name;
    let lat = addressObj.results[1].geometry.location.lat;
    let lng = addressObj.results[1].geometry.location.lng;

    $('[name=country]').val(country);
    $('[name=city]').val(city);
    $('[name=address1]').val(address1 + ', ' + address2);
    $('[name=latitude]').val(lat);
    $('[name=longitude]').val(lng);
}


// If error display error message
function errorText(pass, id){
    !pass ? $(id).addClass('show') : false;
}

validate = {
    name: (name, typeOfName) => {
        let re = /^[a-zA-Z ]*$/;
        return name ? re.test(name) : false;
    },

    email: (email) => {
        let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(email);
    },

    phoneNumber: (phoneNumber) => {
        let re = /^[0-9]*$/;
        return phoneNumber ? re.test(phoneNumber) : false;
    },

    country: (country) => {
        let countryArr = ['American Samoa', "Bolivia", "Cambodia", "France", "Japan", "Jordan", "Philippines", "United Kingdom", "Switzerland"];
        return countryArr.indexOf(country) !== -1;
    },

    city: (city) => {
        return city ? city.length > 3 : false;
    },

    postcode: (postcode) => {
        return postcode ? postcode.length > 3 : false;
    },

    address: (address) => {
        return address ? address.length > 3 : false;
    },

    latitude: (latitude) => {
        let re = /^[-+]?[0-9]*\.?[0-9]+$/;
        return re.test(latitude);
    },

    longitude: (longitude) => {
        let re = /^[-+]?[0-9]*\.?[0-9]+$/;
        return re.test(longitude);
    }
};