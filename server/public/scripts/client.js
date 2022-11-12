$(onReady);

function onReady() {
    renderTasks();
    clickListeners();
}

function clickListeners() {
    $('#submit-btn').on('click', handleSubmit);
}

function handleSubmit() {
    let task = $('#task-input').val();
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            text: task,
            complete: 'false'
        }
    })
    .then ({
        function (response) {
            console.log("response from server:", response);
            renderTasks();
        }
    })
    .catch(function (err){
        alert('unable to add task', err)
    });
}

function renderTasks() {
    console.log('in render tasks');
}