const allowedStatus = ['TO DO', 'IN PROGRESS', 'DONE'];
const allowedPriority = ['HIGH', 'MEDIUM', 'LOW'];
const allowedCategory = ['WORK', 'HOME', 'LEARNING'];


function validateFields({ status, priority, category, dueDate }, res) {
if (status !== undefined && !allowedStatus.includes(status)) {
res.status(400).send('Invalid Todo Status');
return false;
}
if (priority !== undefined && !allowedPriority.includes(priority)) {
res.status(400).send('Invalid Todo Priority');
return false;
}
if (category !== undefined && !allowedCategory.includes(category)) {
res.status(400).send('Invalid Todo Category');
return false;
}
if (dueDate !== undefined && dueDate === null) {
res.status(400).send('Invalid Due Date');
return false;
}
return true;
}


module.exports = { validateFields, allowedStatus, allowedPriority, allowedCategory };
