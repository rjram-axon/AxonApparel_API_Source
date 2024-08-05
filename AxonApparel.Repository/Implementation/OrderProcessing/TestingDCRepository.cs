using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class TestingDCRepository : ITestingDCRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public IQueryable<TestingDCMas> GetDataList()
        {
            return entities.TestingDCMas.Where(t=>t.IsActive).OrderBy(c => c.DCNo);
        }

        public int GetGatePassNo()
        {
            var query = entities.GatePassNo.OrderByDescending(x=>x.GatePassId).FirstOrDefault();            

            if (query == null)
            {
                return 0;
            }
            else
            {
                int gatepassno =(int) query.GatePassId;
                return gatepassno;
            }            
        }

        public bool AddData(TestingDCMas objAd, List<TestingDCDet> objPDet,GatePassNo gatepassobj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.TestingDCMas.Add(objAd);
                    entities.SaveChanges();
                    int masid = objAd.TestingDCId;

                    //Insert into GatePassNo
                    var tst=entities.GatePassNo.Add(gatepassobj);
                    entities.SaveChanges();

                    foreach (var samp in objPDet)
                    {
                        samp.TestingDCId = masid;
                        entities.TestingDCDet.Add(samp);
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

        public TestingDCMas GetDataById(int id)
        {
            return entities.TestingDCMas.Where(c => c.TestingDCId == id).FirstOrDefault();
        }

        public bool DeleteData(int id)
        {
            var result = false;

            //TestingDCDet
            var deletedet = entities.TestingDCDet.Where(d => d.TestingDCId == id).ToList<TestingDCDet>();
            deletedet.ForEach(c => entities.TestingDCDet.Remove(c));
            entities.SaveChanges();

            //TestingDCMas
            var deleteMas = entities.TestingDCMas.Where(d => d.TestingDCId == id).ToList<TestingDCMas>();
            deleteMas.ForEach(c => entities.TestingDCMas.Remove(c));
            entities.SaveChanges();

            entities.SaveChanges();
            result = true;
            return result;
        }

        public bool UpdateData(TestingDCMas objupd, List<TestingDCDet> objPDet)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = false;
                    var Upd = entities.TestingDCMas.Where(c => c.TestingDCId == objupd.TestingDCId).FirstOrDefault();
                    if (Upd != null)
                    {
                        Upd.SupplierId = objupd.SupplierId;
                        Upd.BuyerId = objupd.BuyerId;
                        Upd.ColorId = objupd.ColorId;
                        Upd.TestOn = (objupd.TestOn == 0 ? null : objupd.TestOn);
                        Upd.TestValue = objupd.TestValue;
                        Upd.OrderId = objupd.OrderId;
                        Upd.HSNCODE = objupd.HSNCODE;
                        Upd.VehicleNo = objupd.VehicleNo;
                        Upd.DebitOnSuppId = objupd.DebitOnSuppId;
                        Upd.DebitOnUnitId = objupd.DebitOnUnitId;
                        Upd.TaxId = objupd.TaxId;
                        Upd.Remarks = objupd.Remarks;
                        Upd.ModifyBy = objupd.ModifyBy;
                        Upd.Modify_Date = DateTime.Now;

                        entities.SaveChanges();


                        //Delete from TestingDCDet
                        var deletedet = entities.TestingDCDet.Where(d => d.TestingDCId == objupd.TestingDCId).ToList<TestingDCDet>();
                        deletedet.ForEach(c => entities.TestingDCDet.Remove(c));
                        entities.SaveChanges();

                        foreach (var samp in objPDet)
                        {
                            samp.TestingDCId = objupd.TestingDCId;
                            entities.TestingDCDet.Add(samp);
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

    }
}
