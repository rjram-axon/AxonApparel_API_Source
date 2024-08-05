using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class OrderApprovalRepository : IOrderApprovalRepository
    {
        PlanningEntities entities = new PlanningEntities();


        public bool Update(string OrderNo, int Bmasid, string PA,string PType)
        {
            bool reserved = false;
            string OrdNo = "";

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    //OrderEntry

                    if (PType == "Ord")
                    {
                        var OQueryB = entities.Buy_Ord_Mas.Where(b => b.Buy_Ord_MasId == Bmasid || b.Ref_No == OrderNo).FirstOrDefault();
                        if (OQueryB != null)
                        {
                            OQueryB.PA = PA;
                        }
                        entities.SaveChanges();
                    }

                    var FOQuery = entities.Buy_Ord_Mas.Where(b => b.Ref_No == OrderNo || b.Buy_Ord_MasId == Bmasid).FirstOrDefault();
                    if (FOQuery != null)
                    {                       
                        OrdNo = FOQuery.Order_No;
                    }


                    //StyleEntry
                    if (PType == "Sty")
                    {
                        var StyleQuery = entities.buy_ord_style.Where(b => b.order_no == OrdNo).ToList();
                        if (StyleQuery != null)
                        {
                            foreach (var sty in StyleQuery)
                            {
                                sty.PA = PA;
                            }
                        }
                        entities.SaveChanges();
                    }

                    //Shipment
                    if (PType == "Ship")
                    {
                        var ShipQuery = entities.Buy_Ord_Ship.Where(b => b.Order_No == OrdNo).ToList();
                        if (ShipQuery != null)
                        {
                            foreach (var buy in ShipQuery)
                            {
                                buy.PA = PA;
                            }
                        }
                        entities.SaveChanges();
                    }
                    //Planning
                    if (PType == "Plan")
                    {
                        var PlanQuery = entities.Planning_Mas.Where(b => b.Order_No == OrdNo).ToList();
                        if (PlanQuery != null)
                        {
                            foreach (var plan in PlanQuery)
                            {
                                plan.PA = PA;
                            }
                        }
                        entities.SaveChanges();

                    }
                    //Budget
                    if (PType == "Bud")
                    {
                        var BudgetQuery = entities.Cost_Defn_Mas.Where(b => b.Order_No == OrdNo).ToList();
                        if (BudgetQuery != null)
                        {
                            foreach (var budg in BudgetQuery)
                            {
                                budg.PA = PA;
                            }
                        }
                        entities.SaveChanges();
                    }
                    txscope.Complete();
                    return true;
                }

                catch (Exception ex)
                {
                    txscope.Dispose();

                    return false;
                    throw ex;
                }
            }
        }


        public IList<Domain.BulkOrder> GetPAStatus(int bmasid)
        {          

            IList<BulkOrder> query = (from T in entities.Buy_Ord_Mas
                                     where (T.Buy_Ord_MasId == bmasid)
                                      select new BulkOrder
                                     {
                                         
                                        PA=T.PA,
                                        Buy_Ord_MasId=T.Buy_Ord_MasId,
                                        OrdType=T.OrdType
                                     }).ToList();
            return query;
        }


        public IList<BuyOrderStyle> GetStyleRowid(string ordno)
        {
            IList<BuyOrderStyle> query = (from T in entities.buy_ord_style
                                      where (T.order_no == ordno)
                                          select new BuyOrderStyle
                                      {

                                         Styleid=T.Styleid,
                                         StyleRowid=T.StyleRowid
                                      }).ToList();
            return query;
        }
    }
}
