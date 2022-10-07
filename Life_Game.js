$(function(){
    var interval
    var nb_cell = 50
    var button_pressed = false
  for (let i = 0; i < nb_cell; i++){
      $('table').append("<tr></tr>")
  }
  $('tr').each(function(){
      for (let i = 0; i < nb_cell; i++) {
          $(this).append("<td></td>")
      }
  })
    $('body').append("<form></form>")
    $('form').append("<input type='button' value='generate random' id='random'/>")
    $('form').append("<input type='submit' value='Commencer' id='launch'/>")

    $('#launch').css({"height":"30vh", "width":"50vw", "font-size":"10vh", "float":"right"})
    $('#random').css({"height":"30vh", "width":"50vw", "font-size":"10vh", "float":"right"})
    $('table').css({"float":"left"})

    $('form').on('submit', function (e){
        e.preventDefault()
        button_pressed = !button_pressed
        if (button_pressed){
            $('#launch').attr("value", "Arrêter")
        }else{
            $('#launch').attr("value", "Commencer")
        }
    })

    $('#random').click(function(){
        $('td').removeClass("alive")
        $('td').each(function(){
            rnd = Math.floor(Math.random() * 100);
            if (rnd <= 50){
                $(this).addClass("alive")
            }
        })

    })

    let animate = false
    $(document).on('submit', 'form', function(){
        animate = !animate
        if (animate) {
            startLoop()
        }
        else {
        stopLoop()
        }




    })

    let right_down = false
    let left_down = false

    $('body').mousedown(function(event){
        switch (event.which){
            case 1:
                left_down = true
                right_down = false
                break;

            case 3:
                right_down = true
                left_down = false
                break;
        }
    }).mouseup(function(event){
        switch (event.which){
            case 1:
                left_down = false
                break;

            case 3:
                right_down = false
                break;
        }
    })


        $('td').mouseover(function () {
            if (left_down) {
                $(this).addClass("alive")
            }
        })

        $('td').mouseover(function () {
            if (right_down) {
                $(this).removeClass("alive")
            }
        })

    $('td').click(function(){
        $(this).addClass("alive")
    })
    $('td').contextmenu(function(){
        $(this).removeClass("alive")
    })


    function startLoop() {
        algorythm()
        interval = setInterval(algorythm, 100)
    }

    function stopLoop() {
        interval = clearInterval(interval)
    }

    function algorythm () {
        let table_array = []
        $('td').each(function (index) {
            if ($(this).hasClass("alive")) {
                table_array.push(1)
            } else {
                table_array.push(0)
            }

        })

        $('td').each(function (index) {
            let nb_cell_alive = 0
            for (let x = -1; x <= 1; x++) {
                for (let y = -nb_cell; y <= nb_cell; y += nb_cell) {
                    if (index % nb_cell == 0 && x == -1){
                        x++
                    }
                    else if (index % nb_cell == nb_cell - 1 && x == 1){
                        x += nb_cell * nb_cell + 1
                    }

                    if (table_array[index + x + y] == 1) {

                        nb_cell_alive++
                    }

                }
            }
            for (let x = -1; x <= 1; x++){
                for(let y = -nb_cell; y <= nb_cell; y += nb_cell){

                    if ($(this).hasClass("left_column") && x == -1){
                        x++
                    }
                    if ($(this).hasClass("right_column") && x == 1){
                        x--
                    }

                }
            }
            if (nb_cell_alive == 3) {
                $(this).addClass("alive")
            } else if (nb_cell_alive > 4 || nb_cell_alive < 3) {
                $(this).removeClass("alive")
            }

        })
    }

})

