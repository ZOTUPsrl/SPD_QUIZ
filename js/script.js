var allNames = ['202220', '242191', '210110', '204140', '215140', '342006', '207130', '218121', '318009', '202240'];
var origXPos = [];
var origYPos = [];
var attempts = 0;
var correct = 0;

var captions = [];
captions[0] = "CORRETTO! Cod. 202220 \n Dispositivo scaricatore di sovratensione progettato per proteggere le installazioni elettriche domestiche o commerciali integrate nelle scatole da parete.";
captions[1] = "242191 - Dispositivo scaricatore di sovratensione progettato per proteggere sistemi di illuminazione a LED da danni causati da sovratensioni.";
captions[2] = "210110 - Dispositivo scaricatore di sovratensione progettato per proteggere gli impianti fotovoltaici dalle sovratensioni atmosferiche o di rete.";
captions[3] = "204140 - Dispositivo scaricatore di sovratensione progettato per proteggere attrezzature elettriche e elettroniche industriali da sovratensioni.";
captions[4] = "215140 - Dispositivo scaricatore di sovratensione progettato per proteggere le centrali nucleari e le relative apparecchiature critiche da sovratensioni.";
captions[5] = "342006 - Dispositivo scaricatore di sovratensione progettato per proteggere le infrastrutture IT e i sistemi di archiviazione dati da sovratensioni che potrebbero danneggiare o compromettere i dati.";
captions[6] = "207130 - Dispositivo scaricatore di sovratensione progettato per proteggere gli impianti eolici e i relativi sistemi elettrici da sovratensioni generate da fulmini o da altre fonti.";
captions[7] = "218121 - Dispositivo scaricatore di sovratensione progettato per proteggere le antenne e le apparecchiature di ricezione da danni causati da sovratensioni indotte o dirette.";
captions[8] = "318009 - Dispositivo scaricatore di sovratensione progettato per proteggere le reti dati che utilizzano la tecnologia Power over Ethernet (PoE) da sovratensioni dannose.";
captions[9] = "202240 - Dispositivo scaricatore di sovratensione progettato per proteggere le infrastrutture elettriche dei centri commerciali da sovratensioni che potrebbero causare danni alle apparecchiature e ai sistemi di sicurezza.";

$(document).ready(function() {
    const resetButton = $('#resetButton');
    resetButton.on('click', function() {
        resetGame();
    });

    function resetGame() {
        attempts = 0;
        correct = 0;
        $('#numAttempts').text(attempts);
        $('#numCorrect').text(correct);
        $('.draggable').css('visibility', 'visible');
        $('.messageright, .messagewrong').hide();
        $('.headcircleinside').hide();
        $('#detail').hide();
        $('#shareCon').hide();
        resetDraggablePositions();
        resetVisibility();
    }

    function resetVisibility() {
        $('.draggable').css('visibility', 'visible');
    }

    function resetDraggablePositions() {
        $('.draggable').each(function(index) {
            $(this).css({ top: origYPos[index], left: origXPos[index] });
        });
    }

    function tattoosInit() {
        $('#detail').hide();
        $('#shareCon').hide();

        $(".draggable").each(function() {
            var startPos = $(this).position();
            $(this).data('startPosition', { top: startPos.top, left: startPos.left });
        });

        $('.draggable').draggable({
            revert: function(dropped) {
                if (!dropped || !$(this).data('droppedOnValidTarget')) {
                    var $this = $(this);
                    $this.animate({ top: origYPos[$this.index()], left: origXPos[$this.index()] }, function() {
                        $this.css({ top: origYPos[$this.index()], left: origXPos[$this.index()] });
                    });
                    return true;
                } else {
                    var droppedOnValidTarget = $(this).data('droppedOnValidTarget');
                    return droppedOnValidTarget === true;
                }
            },
            start: function() {
                $(this).data('droppedOnValidTarget', false);
            }
        });

        $('.droppable').droppable({
            hoverClass: 'boxHover',
            drop: function(event, ui) {
                var dragid = ui.draggable.attr('id').substring(1);
                var dropid = $(this).attr('id').substring(1);
                var dataid = $(this).data('id');
                if (dragid == dropid) {
                    $('#' + dragid + 'inside').css('display', 'block');
                    $('#t' + dropid + ' .messageright').css('display', 'inline').delay(1500).fadeOut('slow');
                    ui.draggable.css('visibility', 'hidden');
                    attempts++;
                    correct++;
                    $('#numAttempts').text(attempts);
                    $('#numCorrect').text(correct);
                    showInfo(dataid);

                    if (correct == 10) {
                        $('#share').text('Ti sono serviti ' + attempts + ' tentativi per risolvere tutto.');
                        $('#shareCon').show();
                    }
                } else {
                    $('#t' + dropid + ' .messagewrong').css('display', 'inline').delay(1500).fadeOut('slow');
                    attempts++;
                    $('#numAttempts').text(attempts);
                }
                ui.draggable.data('droppedOnValidTarget', true);
            }
        });

        $('.droppable2').droppable();

        $('#detail').click(function() {
            $('#detail').hide().animate({ opacity: '0' }, 500);
        });
    }

    function showInfo(which) {
        $('#detail').show().animate({ opacity: '1' }, 500);
        $('#detail #desc').text(captions[which]);
        var img = new Image();
        img.src = 'imgs/big-' + allNames[which] + '.jpg';
        $('#detail #photoCon').empty().append(img);
    }

    // Inizializza il gioco
    resetDraggablePositions();
    tattoosInit();
});
