




function handleCellClick(clickedCellEvent) {
    alert(clickedCellEvent);
    var item = document.getElementsByClassName('one').length;
    var item2 = document.getElementsByClassName('xo').length;
    alert(item);
    document.getElementsByClassName('one')[0].getElementsByClassName('xo')[0].innerHTML = 'X';

    alert(item2);

    // document.getElementsByClassName('one')[0].innerHTML = next;

}

