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

namespace AxonApparel.Repository
{
    public class AllowanceRepository : IAllowanceRepository
    {
        HouseKeepingEntities entities = new HouseKeepingEntities();

        public IList<AllowanceSetup> GetRepAllowanceLoad(int? ItemGroupId, int? ItemId)
        {
            var query = (from YD in entities.Proc_Apparel_GetPurchaseAllowDetails(ItemGroupId == null ? 0 : ItemGroupId, ItemId == null ? 0 : ItemId)
                         select new AllowanceSetup
                         {
                             ItemGroup = YD.itemgroup,
                             Item = YD.Item,
                             ItemId = YD.Itemid,
                             ItemGroupId = YD.IgroupId,
                             Uom = YD.uom,
                             Percentage = Convert.ToString(YD.Percentage),
                             Quantity = YD.Allow_Value,
                             CheckPer = false,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<AllowanceSetup> GetRepAllowanceCLoad(int? ItemId)
        {
            int IgId = 0;
            var query = (from YD in entities.Proc_Apparel_GetPurchaseAllowDetails(IgId, ItemId == null ? 0 : ItemId)
                         select new AllowanceSetup
                         {
                             ItemGroup = YD.itemgroup,
                             Item = YD.Item,
                             ItemId = YD.Itemid,
                             ItemGroupId = YD.IgroupId,
                             Uom = YD.uom,
                             Percentage = "",
                             Quantity = YD.Allow_Value,
                             CheckPer = true,

                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateDetData(List<Item> objPEID)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    foreach (var k in objPEID)
                    {
                        var e = entities.Item.Where(a => a.ItemId.Equals(k.ItemId)).FirstOrDefault();
                        if (e != null)
                        {
                            e.ItemId = k.ItemId;
                            e.Allow_Value = k.Allow_Value;
                            e.Percentage = k.Percentage;
                        }
                    }
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                //catch (Exception ex)
                //{
                //    txscope.Dispose();
                //}
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
            }
            return reserved;
        }


        public IList<AllowanceSetup> GetRepProcessAllowanceLoad(int? ProcessId)
        {
            int iId = 0;
            var query = (from YD in entities.Proc_Apparel_GetProcessAllowDetails(ProcessId == null ? 0 : ProcessId, iId)
                         select new AllowanceSetup
                         {
                             Process = YD.Process,
                             ProcessId = YD.Processid,
                             TolerId = (int)(YD.Toleranceid == null ? 0 : YD.Toleranceid),
                             ProPercentage = YD.Percentage,
                             PQuantity = YD.Qty,
                             CheckPer = false,

                         }).AsQueryable();

            return query.ToList();
        }


        public bool UpdateProcessDetData(List<Process_Tolerance> objPEID)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {


                    //det
                    //var Det = entities.Process_Tolerance.Where(u => 1 == 1);

                    //foreach (var D in Det)
                    //{
                    //    entities.Process_Tolerance.Remove(D);
                    //}
                    //entities.SaveChanges();



                    foreach (var Pr in objPEID)
                    {

                        if (((Pr.Quantity) > 0 || (Pr.Percentage) > 0) && Pr.ToleranceId == 0)
                        {
                            entities.Process_Tolerance.Add(Pr);
                        }
                        else if (((Pr.Quantity) > 0 || (Pr.Percentage) > 0) && Pr.ToleranceId > 0)
                        {
                            foreach (var k in objPEID)
                            {
                                var e = entities.Process_Tolerance.Where(a => a.ToleranceId.Equals(k.ToleranceId)).FirstOrDefault();
                                if (e != null)
                                {
                                    e.Percentage = k.Percentage;
                                    e.IsPercent = k.IsPercent;
                                    e.Quantity = k.Quantity;
                                }
                            }
                            entities.SaveChanges();
                        }
                    }
                    entities.SaveChanges();





                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }
    }
}
