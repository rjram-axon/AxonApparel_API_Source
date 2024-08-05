using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class TestingDCReceiptRepository : ITestingDCReceiptRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
         
        public IQueryable<TestingDCReceiptMas> GetDataList()
        {
            return entities.TestingDCReceiptMas.OrderBy(c => c.DCReceiptNo);
        }

        public bool AddData(TestingDCReceiptMas objAd, List<TestingDCReceiptDet> objPDet)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.TestingDCReceiptMas.Add(objAd);
                    entities.SaveChanges();
                    int masid = objAd.TestingDCReceiptId;

                    foreach (var samp in objPDet)
                    {
                        samp.TestingDCReceiptId = masid;
                        entities.TestingDCReceiptDet.Add(samp);
                    }

                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (DbEntityValidationException ex)
                {
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "TestingDC-AddData");
                }
            }
            return reserved;
        }

        public bool UpdateData(TestingDCReceiptMas objupd, List<TestingDCReceiptDet> objPDet)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = false;
                    var Upd = entities.TestingDCReceiptMas.Where(c => c.TestingDCReceiptId == objupd.TestingDCReceiptId).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.TestingDCId = objupd.TestingDCId;
                        Upd.SupplierId = objupd.SupplierId;
                        //Upd.DCReceiptNo = objupd.DCReceiptNo;
                        //Upd.DCReceiptDate = objupd.DCReceiptDate;
                        Upd.OrderRefNo = objupd.OrderRefNo;
                        //Upd.TestValue = objupd.TestValue;
                        Upd.BillNo = objupd.BillNo;
                        Upd.BillDate = objupd.BillDate;
                        //Upd.OrderId = objupd.OrderId;
                        Upd.GSTtaxId = objupd.GSTtaxId;
                        Upd.CGST_Per = objupd.CGST_Per;
                        Upd.CGSTValue = objupd.CGSTValue;
                        Upd.SGST_Per = objupd.SGST_Per;
                        Upd.SGSTValue = objupd.SGSTValue;
                        Upd.IGST_Per = objupd.IGST_Per;
                        Upd.IGSTValue = objupd.IGSTValue;
                        Upd.TotalValue = objupd.TotalValue;
                        Upd.Remarks = objupd.Remarks;
                        Upd.ModifyBy = objupd.ModifyBy;
                        Upd.ModifyDate = DateTime.Now;

                        entities.SaveChanges();

                        //Delete from TestingDCReceiptDet
                        var deletedet = entities.TestingDCReceiptDet.Where(d => d.TestingDCReceiptId == objupd.TestingDCReceiptId).ToList<TestingDCReceiptDet>();
                        deletedet.ForEach(c => entities.TestingDCReceiptDet.Remove(c));
                        entities.SaveChanges();

                        foreach (var samp in objPDet)
                        {
                            samp.TestingDCReceiptId = objupd.TestingDCReceiptId;
                            entities.TestingDCReceiptDet.Add(samp);
                        }
                        entities.SaveChanges();

                        txscope.Complete();
                        result = true;

                    }
                    else { result = false; }

                    return result;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    throw ex;
                }
            }
        }

        public bool DeleteData(int id)
        {
            var result = false;

            //TestingDCReceiptDet
            var deletedet = entities.TestingDCReceiptDet.Where(d => d.TestingDCReceiptId == id).ToList<TestingDCReceiptDet>();
            deletedet.ForEach(c => entities.TestingDCReceiptDet.Remove(c));
            entities.SaveChanges();

            //TestingDCReceiptMas
            var deleteMas = entities.TestingDCReceiptMas.Where(d => d.TestingDCReceiptId == id).ToList<TestingDCReceiptMas>();
            deleteMas.ForEach(c => entities.TestingDCReceiptMas.Remove(c));
            entities.SaveChanges();

            entities.SaveChanges();
            result = true;
            return result;
        }

        public TestingDCReceiptMas GetDataById(int id)
        {
            return entities.TestingDCReceiptMas.Where(c => c.TestingDCReceiptId == id).FirstOrDefault();
        }
    }
}
