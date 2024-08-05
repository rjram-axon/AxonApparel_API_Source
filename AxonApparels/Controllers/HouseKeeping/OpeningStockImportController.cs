using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Common;
using System.IO;
using ExcelDataReader;
using System.Data;
using System.Reflection;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.UI.WebControls;
using System.Web.UI;
using System.Net;
//using Syncfusion.XlsIO;
using System.Runtime.InteropServices;

using Microsoft.Office.Interop.Excel;

namespace AxonApparels.Controllers.HouseKeeping
{
    public class OpeningStockImportController : Controller
    {
        //
        // GET: /OpeningStockImport/

        IOpeningStockImportBusiness OsBus = new OpeningStockImportBusiness();

        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public ActionResult OpeningStockImportIndex()
        {
            return View();
        }

        private List<ItmStkDet> GetDataFromCSVFile(Stream stream)
        {
            var empList = new List<ItmStkDet>();
            try
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    var dataSet = reader.AsDataSet(new ExcelDataSetConfiguration
                    {
                        ConfigureDataTable = _ => new ExcelDataTableConfiguration
                        {
                            UseHeaderRow = true // To set First Row As Column Names    
                        }
                    });

                    if (dataSet.Tables.Count > 0)
                    {
                        var dataTable = dataSet.Tables[0];
                        foreach (DataRow objDataRow in dataTable.Rows)
                        {
                            //if (objDataRow.ItemArray.All(x => string.IsNullOrEmpty(x?.ToString()))) continue;    
                            empList.Add(new ItmStkDet()
                            {
                                item = objDataRow["Item"].ToString(),
                                color = objDataRow["Color"].ToString(),
                                size = objDataRow["Size"].ToString(),
                                lotNo = objDataRow["LotNo"].ToString(),
                                ProcessName = objDataRow["Process"].ToString(),
                                supplier = objDataRow["Supplier"].ToString(),
                                ManuFacturer = objDataRow["ManuFacturer"].ToString(),
                                Rate = Convert.ToDecimal(objDataRow["Rate"].ToString()),
                                qty = Convert.ToDecimal(objDataRow["Quantity"].ToString()),

                                sQty = Convert.ToDecimal(objDataRow["Sec Qty"].ToString()),
                                FabricGSM = objDataRow["GSM"].ToString(),
                                Status = objDataRow["Status"].ToString(),
                                Result = objDataRow["Result"].ToString(),
                              
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return empList;
        }




        [HttpPost]
        public ActionResult ImportFile(HttpPostedFileBase importFile, string entryNo, string entrydate, int Created, int Company)
        {
            if (importFile == null) return Json(new { Status = 0, Message = "No File Selected" });

            try
            {

                List<ItmStkDet> ItkStockList = new List<ItmStkDet>();
                ItmStkDet ItkStock = new ItmStkDet();

                var fileData = GetDataFromCSVFile(importFile.InputStream);

                if (fileData.Count > 0)
                {

                    foreach (var itm in fileData)
                    {
                        ItkStock.item = itm.item;
                        ItkStock.color = itm.color;
                        ItkStock.size = itm.size;
                        ItkStock.lotNo = itm.lotNo;
                        ItkStock.ProcessName = itm.ProcessName;
                        ItkStock.supplier = itm.supplier;
                        ItkStock.ManuFacturer = itm.ManuFacturer;
                        ItkStock.Rate = itm.Rate;
                        ItkStock.qty = itm.qty;
                        ItkStock.sQty = itm.sQty;
                        ItkStock.FabricGSM = itm.FabricGSM;
                        ItkStock.Status = itm.Status;
                        ItkStock.Transno = entryNo;
                        ItkStock.transdate = Convert.ToDateTime(entrydate);
                        ItkStock.Createdby = Created;
                        ItkStock.Result = itm.Result;
                        ItkStock.companyid = Company;

                        var result = OsBus.GetListUserStatus(ItkStock);

                        ItkStockList.Add(new ItmStkDet
                        {
                            item = result.Value.item,
                            color = result.Value.color,
                            size = result.Value.size,
                            lotNo = result.Value.lotNo,
                            ProcessName = result.Value.ProcessName,
                            supplier = result.Value.supplier,
                            ManuFacturer = result.Value.ManuFacturer,
                            Rate = result.Value.Rate,
                            qty = result.Value.qty,
                            sQty = result.Value.sQty,
                            FabricGSM = result.Value.FabricGSM,
                            Status = result.Value.Status,
                            Transno = result.Value.Transno,
                            entrydate = result.Value.entrydate,
                            Createdby = Created,
                            Result = result.Value.Result,
                            companyid = Company,
                        });

                    }
                    DateTime date = DateTime.Now;
                    string dt = date.ToString();

                    //string appPath = AppDomain.CurrentDomain.BaseDirectory;
                    //DirectoryInfo di = Directory.CreateDirectory(appPath + "/Uploads/" + "OpeningStockImport");

                    string FilePath = "~/Uploads/" + "OpeningStockImport" + "/" + importFile.FileName + ".xlx";


                    //Save the file to server temp folder
                    // string fullPath = Path.Combine(Server.MapPath("~/Uploads/" + "OpeningStockImport" + "/"), importFile.FileName);

                    // create a excel app along side with workbook and worksheet and give a name to it  
                    Microsoft.Office.Interop.Excel.Application excelApp = new Microsoft.Office.Interop.Excel.Application();
                    Microsoft.Office.Interop.Excel.Workbook excelWorkBook = excelApp.Workbooks.Add();
                    Microsoft.Office.Interop.Excel._Worksheet xlWorksheet = excelWorkBook.Sheets[1];
                    Microsoft.Office.Interop.Excel.Range xlRange = xlWorksheet.UsedRange;

                    Microsoft.Office.Interop.Excel.Worksheet excelWorkSheet = excelWorkBook.Sheets.Add();
                    excelWorkSheet.Name = importFile.FileName;

                    if (ItkStockList.Count > 0)
                    {
                        excelWorkSheet.Cells[1, 1] = "Item";
                        excelWorkSheet.Cells[1, 2] = "Color";
                        excelWorkSheet.Cells[1, 3] = "Size";
                        excelWorkSheet.Cells[1, 4] = "LotNo";
                        excelWorkSheet.Cells[1, 5] = "Process";
                        excelWorkSheet.Cells[1, 6] = "Supplier";
                        excelWorkSheet.Cells[1, 7] = "ManuFacturer";
                        excelWorkSheet.Cells[1, 8] = "Rate";
                        excelWorkSheet.Cells[1, 9] = "Quantity";
                        excelWorkSheet.Cells[1, 10] = "Sec Qty";
                        excelWorkSheet.Cells[1, 11] = "GSM";
                        excelWorkSheet.Cells[1, 12] = "Status";
                        excelWorkSheet.Cells[1, 13] = "Result";
                        int count = 2;
                        foreach (var item in ItkStockList)
                        {
                            excelWorkSheet.Cells[count, 1] = item.item;
                            excelWorkSheet.Cells[count, 2] = item.color;
                            excelWorkSheet.Cells[count, 3] = item.size;
                            excelWorkSheet.Cells[count, 4] = item.lotNo;
                            excelWorkSheet.Cells[count, 5] = item.ProcessName;
                            excelWorkSheet.Cells[count, 6] = item.supplier;
                            excelWorkSheet.Cells[count, 7] = item.ManuFacturer;
                            excelWorkSheet.Cells[count, 8] = item.Rate;
                            excelWorkSheet.Cells[count, 9] = item.qty;
                            excelWorkSheet.Cells[count, 10] = item.sQty;
                            excelWorkSheet.Cells[count, 11] = item.FabricGSM;
                            excelWorkSheet.Cells[count, 12] = item.Status;
                            excelWorkSheet.Cells[count, 13] = item.Result;
                            count++;
                        }
                    }



                    string baseDirectory = "D:\\ImportExcel\\";
                    string absolutePath = Path.GetFullPath(baseDirectory);
                    DirectoryInfo di2 = Directory.CreateDirectory(absolutePath);

                    string relativePath = baseDirectory + importFile.FileName;

                    string absolutePath2 = Path.GetFullPath(relativePath);

                    excelWorkBook.SaveAs(absolutePath2);
                    excelWorkBook.Close();
                    excelApp.Quit();

                    return Json(new { path = FilePath, Status = 1, Message = "File Imported Successfully " });
                }
                else {

                    return Json(new { path ="" , Status = 1, Message = "File Not Valid.. " });
                }
               

               // string relativePath = "..\\"+ importFile.FileName;
               // string baseDirectory = "D:\\ImportExcel\\";
               // string absolutePath = Path.GetFullPath(baseDirectory + relativePath);

               //// string secondpath = "D:" + "/" + "Nandha" + "/" + importFile.FileName;
               // excelWorkBook1.SaveAs(absolutePath); 
               // excelWorkBook1.Close();
               // excelApp1.Quit();

              



               
            }
            catch (Exception ex)
            {
                return Json(new { Status = 0, Message = ex.Message });
            }
        }

        byte[] GetFile(string s)
        {
            System.IO.FileStream fs = System.IO.File.OpenRead(s);
            byte[] data = new byte[fs.Length];
            int br = fs.Read(data, 0, data.Length);
            if (br != fs.Length)
                throw new System.IO.IOException(s);
            return data;
        }

    }

     
    public static class Extensions
    {
        public static System.Data.DataTable ToDataTable<T>(this List<T> items)
        {
            System.Data.DataTable dataTable = new System.Data.DataTable(typeof(T).Name);

            //Get all the properties  
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Defining type of data column gives proper data table   
                var type = (prop.PropertyType.IsGenericType && prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>) ? Nullable.GetUnderlyingType(prop.PropertyType) : prop.PropertyType);
                //Setting column names as Property names  
                dataTable.Columns.Add(prop.Name, type);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows  
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            return dataTable;
        }
    }




}
