$(onReady);

function onReady() {
    renderTasks();
    clickListeners();
    clearInputs();
}

function clearInputs() {
    $('input').val('');
}

function clickListeners() {
    $('#submit-btn').on('click', handleSubmit);
}

function handleSubmit() {
    let task = $('#task-input').val();
    clearInputs();
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            text: task,
            complete: 'false'
        }
    }).then (function (response) {
            console.log("response from server:", response);
            renderTasks();
        }).catch(function (err){
            alert('unable to add task', err)
        });
}

function renderTasks() {
    console.log('in render tasks');
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then (function (response) {
        $('#task-list').empty();
        for (task of response){
            let id = task.id;
            $('#task-list').prepend(`
                <tr>
                    <td class="task-text">${task.text}</td>
                    <td><button class="complete-btn" data-id = "${id}">Completed</button></td>
                    <td><button class="delete-btn" data-id = "${id}">Delete</button></td>
                </tr>
            `);
        };
    }).catch(function (err) {
        alert('unable to render task list');
    });
}