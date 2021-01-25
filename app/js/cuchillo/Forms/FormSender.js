$.fn.serializeFormJSON = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (this.name == 'condiciones-dos') {
      this.name = 'condiciones';
    }
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });

  var $radio = $('input[type=checkbox][name=condiciones-dos],input[type=checkbox][name=condiciones],input[type=checkbox][name=informacion]', this);
  $.each($radio, function() {
    if (this.name == 'condiciones-dos') {
      this.name = 'condiciones';
    }
    if (!o.hasOwnProperty(this.name)) {
      o[this.name] = false;
    } else {
      o[this.name] = true;
    }

  });
  return o;
};

class FormSender {

  static send(__formValidator, __data, __form, __files = null) {
    __form.classList.add("__loading");

    let data = {};

    const mssg_ok = __form.getAttribute("data-mssg-ok")===undefined? "El mensaje ha sido envíado, nos pondremos en contacto contigo" :  __form.getAttribute("data-mssg-ok");
    const mssg_nok = __form.getAttribute("data-mssg-nok")===undefined? "Ha ocurrido un error. Revisa los datos y vuelve a intentarlo" :  __form.getAttribute("data-mssg-nok");

    function WS_send(form) {
      var url = "https://www.euskadi.eus/ac93aBasqueDCCWSWar/BasqueDCCWS/sendInformation";
      var data;

      try {
        data = form.serializeFormJSON();

        $.ajax({
          url: url,
          type: "POST", // type of action POST || GET
          data: JSON.stringify(data),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          crossDomain: true,
          success: function(response) {
            form[0].classList.remove("__loading");

            console.log(response)

            if(JSON.parse(response).estado != "1") {
              WinMessage.success(mssg_ok);
            } else {
              WinMessage.error(mssg_nok);
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("some error: " + textStatus + " ; " + errorThrown);
          }
        });
      } catch (err) {
        console.log("ERROR FORM SEND");
      } finally {

      }
    }
//*********** End ENVIO FORMULARIO *************//
    WS_send($(__form));
  }


}