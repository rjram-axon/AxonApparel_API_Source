using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;
using System.Data.Entity.Validation;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
namespace AxonApparel.Repository
{
    public class OpeningStockImportRepository : IOpeningStockImportRepository
    {

        PurchaseEntities entities = new PurchaseEntities();
        MasterEntities Masentities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();


        public Domain.ItmStkDet GetListUserStatus(Domain.ItmStkDet data)
        {
             //Domain.ItmStkDet List = new Domain.ItmStkDet();
            // ItmStkDet List = new ItmStkDet();

            string NotValid = "";
            int itemid = 0;
            int Colorid = 0;
            int SizeId = 0;
            int ProcessId = 0;
            int SupplierId = 0;
           
            if (data != null)
            {
                var item = entities.Item.Where(c => c.Item1 == data.item).FirstOrDefault();
                if (item == null)
                {
                    NotValid = "Item Not Valid";
                   
                }
                else
                {
                     itemid = item.ItemId;
                }

                if (NotValid == "")
                {

                    var color = entities.Color.Where(c => c.Colorname == data.color).FirstOrDefault();

                    if (color == null)
                    {
                        NotValid = "Color Not Valid";
                    }
                    else
                    {
                        Colorid = color.Colorid;
                    }

                }

                if (NotValid == "")
                {

                    var size = entities.Size.Where(c => c.size1 == data.size).FirstOrDefault();

                    if (size == null)
                    {
                        NotValid = "Size Not Valid";
                    }
                    else
                    {
                        SizeId = size.SizeId;
                    }


                }

                if (NotValid == "")
                {
                    if (data.ProcessName != null )
                    {
                        if (data.ProcessName != "")
                        {
                            var Process = Masentities.Process.Where(c => c.Process1 == data.ProcessName).FirstOrDefault();

                            if (Process == null)
                            {
                                NotValid = "Process Not Valid";
                            }
                            else
                            {
                                ProcessId = Process.ProcessId;
                            }
                        }

                    }
                }

                if (NotValid == "")
                {
                   
                    var Supplier = Masentities.Supplier.Where(c => c.Supplier1 == data.supplier).FirstOrDefault();

                    if (Supplier == null)
                    {
                        NotValid = "Supplier Not Valid";
                    }
                    else
                    {
                        SupplierId = Supplier.SupplierId;
                    }
                }

                int uomid = 0;
                string joborderNo = "";

               
                if (NotValid == "")
                {
                    if (data.qty > 0)
                    {
                        //insert the Op_Stock 
                        var Pg1 = entities.Proc_Apparel_GetOpInsertItemstock(itemid, Colorid, SizeId, uomid, data.qty, data.Rate, joborderNo, data.Transno, ProcessId, data.lotNo, data.transdate, data.companyid, SupplierId, data.Styleid, data.sQty, data.StockId, data.Remarks, data.StoreUnitID, data.Createdby, "G",0);
                        entities.SaveChanges();
                        NotValid = "Stock Inserted";
                    }
                }


            }

            data.Result = NotValid;
            return data;
        }


    }
}
