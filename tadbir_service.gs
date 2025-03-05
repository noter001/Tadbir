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
    var phoneColumn = sheet.getRange("B2:B" + sheet.getLastRow()).getValues().flat();
    if (phoneColumn.includes(data.phone)) {
      return ContentService.createTextOutput(JSON.stringify({status: "error", message: "⚠️ هذا الرقم مُسجَّل بالفعل!"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // إضافة البيانات في الصف العلوي بدءًا من الصف 2 باستخدام دالة insertDataAtTop
    insertDataAtTop([
      data.date_time,         // وقت الإدخال
      data.id,                // معرف الطلب
      data.name.trim(),       // الاسم
      data.phone.trim(),      // رقم الهاتف
      data.address.trim(),    // العنوان
      data.order,             // نوع الطلب
      data.location.trim(),   // الموقع الجغرافي
      data.societe.trim(),    // اسم الشركة
      data.address_societe.trim()  // عنوان الشركة
      data.location.trim(),   // الموقع الجغرافي
    ]);

    return ContentService.createTextOutput(JSON.stringify({status: "success", message: "✅ تم إرسال البيانات بنجاح!"}))
      .setMimeType(ContentService.MimeType.JSON);
  
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: "error", message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function insertDataAtTop(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // إدراج صفوف جديدة بدءًا من الصف 2
  sheet.insertRows(2, 1); // إضافة صف جديد في الصف 2
  // إدخال البيانات في الصف الجديد
  var range = sheet.getRange(2, 1, 1, data.length);
  range.setValues([data]);
}

// معالجة CORS لمنع أخطاء الشبكة
function doGet(e) {
  return ContentService.createTextOutput("CORS Enabled")
    .setMimeType(ContentService.MimeType.JSON);
}
