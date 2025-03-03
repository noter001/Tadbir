function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById("1g5iK44QyOGrbE5i1_YBCmJe3RtyuF6EFfr1QHPRyCXM").getActiveSheet();
    
    // التأكد من أن البيانات المدخلة هي JSON
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (error) {
      return sendResponse("error", "❌ بيانات غير صالحة، يرجى إرسال JSON صحيح.");
    }

    // التحقق من الحقول الفارغة
    if (!data.name || !data.phone || !data.address || !data.order || !data.location) {
      return sendResponse("error", "⚠️ المرجو ملء جميع الحقول قبل الإرسال!");
    }

    // التحقق من أن رقم الهاتف غير مكرر
    var phoneColumn = sheet.getRange("B2:B" + sheet.getLastRow()).getValues();
    for (var i = 0; i < phoneColumn.length; i++) {
      if (phoneColumn[i][0] === data.phone.trim()) {
        return sendResponse("error", "⚠️ هذا الرقم مُسجَّل بالفعل!");
      }
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

    return sendResponse("success", "✅ تم إرسال البيانات بنجاح!");

  } catch (error) {
    return sendResponse("error", "❌ خطأ داخلي: " + error.toString());
  }
}

// دالة لإرسال الردود بصيغة JSON مع دعم CORS
function sendResponse(status, message) {
  var response = ContentService.createTextOutput(JSON.stringify({status: status, message: message}))
    .setMimeType(ContentService.MimeType.JSON);

  // إضافة رؤوس CORS لدعم الوصول من مصادر مختلفة
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}

// دعم CORS في دالة doGet
function doGet(e) {
  var response = ContentService.createTextOutput("Tadbir API is working")
    .setMimeType(ContentService.MimeType.TEXT);

  // إضافة رؤوس CORS لدعم الوصول من مصادر مختلفة
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}
