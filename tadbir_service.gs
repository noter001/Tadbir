function doPost(e) {
  var sheet = SpreadsheetApp.openById("1g5iK44QyOGrbE5i1_YBCmJe3RtyuF6EFfr1QHPRyCXM").getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.name,
    data.phone,
    data.address,
    data.order,
    data.location,
    new Date()
  ]);

  // إعداد CORS للسماح بالوصول من موقعك
  var response = ContentService.createTextOutput("تم استلام البيانات بنجاح!");
  response.setMimeType(ContentService.MimeType.TEXT);
  
  // إضافة رأس CORS لتحديد المواقع المسموح لها بالوصول
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  return response;
}


function doGet(e) {
  return ContentService.createTextOutput("Google Apps Script يعمل بنجاح!")
    .setMimeType(ContentService.MimeType.TEXT);
}
