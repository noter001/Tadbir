function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById("1g5iK44QyOGrbE5i1_YBCmJe3RtyuF6EFfr1QHPRyCXM").getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // التحقق من الحقول الفارغة
    if (!data.name || !data.phone || !data.address || !data.order || !data.location || !data.societe || !data.address_societe) {
      return ContentService.createTextOutput(JSON.stringify({status: "error", message: "⚠️ المرجو ملء جميع الحقول!"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // التحقق من أن رقم الهاتف غير مكرر
    var phoneColumn = sheet.getRange("C2:C" + sheet.getLastRow()).getValues().flat();
    if (phoneColumn.includes(data.phone)) {
      return ContentService.createTextOutput(JSON.stringify({status: "error", message: "⚠️ هذا الرقم مُسجَّل بالفعل!"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // إضافة البيانات إلى الجدول
    sheet.appendRow([
      data.date_time,                  // وقت الإدخال
      data.id,                         // معرف الطلب
      data.name.trim(),                // الاسم
      "'" + data.phone.trim(),         // رقم الهاتف (كقيمة نصية لمنع تحويله إلى +212)
      data.address.trim(),             // العنوان
      data.order,                      // نوع الطلب
      data.location.trim(),            // الموقع الجغرافي
      data.societe.trim(),             // اسم الشركة
      data.address_societe.trim()      // عنوان الشركة
    ]);

    return ContentService.createTextOutput(JSON.stringify({status: "success", message: "✅ تم إرسال البيانات بنجاح!"}))
      .setMimeType(ContentService.MimeType.JSON);
  
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


// معالجة CORS لمنع أخطاء الشبكة
function doGet(e) {
  return ContentService.createTextOutput("CORS Enabled")
    .setMimeType(ContentService.MimeType.JSON);
}
