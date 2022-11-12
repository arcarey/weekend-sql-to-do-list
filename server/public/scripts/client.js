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
    $('#task-list').on('click', '.delete-btn', handleDelete);
    $('#task-list').on('click', '.complete-btn', handleComplete);
}
function handleDelete() {
    console.log('in delete function');
    let id = $(this).data('id');
    $.ajax ({
        type: 'DELETE',
        url: `/tasks/${id}`
    }).then(function(response){
        console.log('response from server on delete:', response);
        renderTasks();
    }).catch(function (err) {
        console.log('error in delete', err);
    });
}
function handleComplete() {
    console.log('in complete function');
    let complete = $(this).data('completed');
    console.log('complete val:', complete);
    complete = !complete;
    console.log('new complete val:', complete);
    let id = $(this).data('id');
    $.ajax ({
        type: "PUT",
        url: `/tasks/${id}`,
        data: {complete: complete}
    }).then (function (response) {
        renderTasks();
        console.log('task complete toggled', response);
    }).catch(function (err) {
        alert('error in put', err)
    });
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
            let classToAdd;
            task.complete ? classToAdd = 'completed' : classToAdd = 'incomplete';
            let id = task.id;
            $('#task-list').append(`
                <tr class = "${classToAdd}">
                    <td class="task-text">${task.text}</td>
                    <td><button class="complete-btn" data-id = "${id}" data-completed = "${task.complete}">Completed</button></td>
                    <td><button class="delete-btn" data-id = "${id}">Delete</button></td>
                </tr>
            `);
        };
    }).catch(function (err) {
        alert('unable to render task list');
    });
}