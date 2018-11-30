// https://www.zhisiyun.com/admin/tm/cardrecord/hr_list_v2
var arr = [];
$('#work_result_tb tr').each(function(){
    arr.push({
        date: $(this).find('td:nth-child(1)').text(),
        end_time: $(this).find('td.sign_out').text().replace('\n', ''),
        start_time: $(this).find('td:nth-child(5)').text().replace('\n', ''),
        label: $(this).find('td:nth-child(2)').text()
    })
});
// 工作日
var csvData1 = arr.filter(item => {
    if(item.end_time) {
        let temp = item.end_time.split(':');
        if(parseInt(temp) >= 21) {
            return true
        }
    }
    return false
})
// 含六日
var csvData2 = arr.filter(item => {
    if(['六', '日'].indexOf(item.label) !== -1) {
        return Boolean(item.end_time && item.start_time);
    }
    if(item.end_time) {
        let temp = item.end_time.split(':');
        if(parseInt(temp) >= 21) {
            return true
        }
    }
    return false
});
var createCsv = (data, text) => {
    const a = document.createElement('a');
    a.download = 'month-1.csv';
    let str = data.map(((item, index) => `${['六', '日'].indexOf(item.label) !== -1 ? '周末加班餐' : '加班餐'},${index + 1},${item.date},${item.label},${item.start_time},${item.end_time},${['六', '日'].indexOf(item.label) !== -1 ? 60 : 30}`)).join('\n');
    let total = data.reduce((all, item) => {
        let _num = ['六', '日'].indexOf(item.label) !== -1 ? 60 : 30;
        return all + _num;
    }, 0);
    str += `\n总计,,,,,,${total}`
    a.href="data:text/csv;charset=utf-8,\uFEFF" + encodeURI(str);
    a.text = text || '下载csv'
    $('body').append($(a))
}
createCsv(csvData1, 'csvData1');
createCsv(csvData2, 'csvData2');
// TODO: 改成新窗口的
