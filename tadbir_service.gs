function doPost(e) {
  function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById("1g5iK44QyOGrbE5i1_YBCmJe3RtyuF6EFfr1QHPRyCXM").getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // التحقق من الحقول الفارغة
    if (!data.name || !data.phone || !data.address || !data.order || !data.location) {
      return ContentService.createTextOutput(JSON.stringify({status: "error", message: "المرجو ملء جميع الحقول قبل الإرسال!"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      data.name,
      data.phone,
      data.address,
      data.order,
      data.location,
      new Date()
    ]);

    return ContentService.createTextOutput(JSON.stringify({status: "success", message: "تم إرسال البيانات بنجاح!"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({status: "success", message: "الخادم يعمل بنجاح!"}))
       .setMimeType(ContentService.MimeType.JSON);
}
