function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById("1g5iK44QyOGrbE5i1_YBCmJe3RtyuF6EFfr1QHPRyCXM").getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // التحقق من الحقول الفارغة
    if (!data.name || !data.phone || !data.address || !data.order || !data.location) {
      return ContentService.createTextOutput(JSON.stringify({status: "error", message: "المرجو ملء جميع الحقول قبل الإرسال!"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // التحقق من أن رقم الهاتف غير مكرر
    var phoneColumn = sheet.getRange("B2:B" + sheet.getLastRow()).getValues().flat();
    if (phoneColumn.includes(data.phone)) {
      return ContentService.createTextOutput(JSON.stringify({status: "error", message: "⚠️ هذا الرقم مُسجَّل بالفعل!"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // إضافة البيانات إلى الجدول
    sheet.appendRow([
      data.name.trim(),
      data.phone.trim(),
      data.address.trim(),
      data.order,
      data.location.trim(),
      new Date()
    ]);

    var output = ContentService.createTextOutput(JSON.stringify({status: "success", message: "تم إرسال البيانات بنجاح!"}))
      .setMimeType(ContentService.MimeType.JSON);
    
    // إضافة CORS headers لمنع أخطاء الشبكة
    output.setHeader("Access-Control-Allow-Origin", "*");
    output.setHeader("Access-Control-Allow-Methods", "POST, GET");
    output.setHeader("Access-Control-Allow-Headers", "Content-Type");

    return output;
  
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
