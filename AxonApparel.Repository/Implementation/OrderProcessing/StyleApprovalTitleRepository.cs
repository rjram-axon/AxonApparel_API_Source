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

namespace AxonApparel.Repository
{
    public class StyleApprovalTitleRepository : IStyleApprovalTitleRepository
    {
        OrderEntities entities = new OrderEntities();


        public IQueryable<Domain.BuyOrderStyle> GetAppmasDetails(int Id)
        {
            IQueryable<Domain.BuyOrderStyle> query = (from a in entities.Proc_Apparel_GetBuyorddetApp_Mas(Id)
                                                      select new Domain.BuyOrderStyle
                                                           {
                                                               order_no = a.Order_No,
                                                               Ref_No = a.Ref_No,
                                                               BuyerName = a.Buyer,
                                                               Styleid = a.StyleId,
                                                               styleName = a.Style,
                                                               quantity = a.quantity,
                                                               OrderDate = (DateTime)a.Order_Date,
                                                               Type = a.OrdType,
                                                              
                                                           }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.Approval> GetAppDDLdet(int Id)
        {
            IQueryable<Domain.Approval> query = (from a in entities.Proc_Apparel_GetApprovalMasDDL()
                                                 select new Domain.Approval
                                                           {
                                                               ApprovalId = a.ApprovalId,
                                                               ApprovalName = a.ApprovalTitle,
                                                             
                                                           }).AsQueryable();

            return query;
        }

        public IQueryable<Domain.buyordapptitle> GetAppEditDetails(string Ordno, int Id)
        {
            IQueryable<Domain.buyordapptitle> query = (from a in entities.Proc_Apparel_GetEditStyleApproval(Ordno, Id)
                                                       select new Domain.buyordapptitle
                                                           {
                                                               Approvalid = (int)a.Approvalid,
                                                               order_no = a.order_no,
                                                               ordertype = a.ordertype,
                                                               styleid = (int)a.styleid,
                                                               TitleId = a.TitleId,
                                                               ApprovalTitle = a.ApprovalTitle
                                                           }).AsQueryable();

            return query;
        }

        public bool AddData(List<buyordapptitle> AppList)
        {
            int PrecostMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (AppList.Count > 0)
                    {
                        foreach (var App in AppList)
                        {
                            entities.buyordapptitle.Add(App);
                        }
                        entities.SaveChanges();
                      
                    }
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

        public bool UpdateData(List<buyordapptitle> AppList)
        {
            int PrecostMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (AppList.Count > 0)
                    {
                       
                        string Ordno=AppList[0].order_no;
                        int styid = (int)AppList[0].styleid;
                        var del = entities.Proc_Apparel_DeleteStyleApp(Ordno, styid);
   
                        entities.SaveChanges();

                        foreach (var Ap in AppList)
                        {
                            entities.buyordapptitle.Add(Ap);
                        }
                        entities.SaveChanges();

                    }
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

        public bool DeleteData(List<buyordapptitle> AppList)
        {
            int PrecostMasid = 0;
            //int MeaDetId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    if (AppList.Count > 0)
                    {
                        string Ordno = AppList[0].order_no;
                        int styid = (int)AppList[0].styleid;
                        var del = entities.Proc_Apparel_DeleteStyleApp(Ordno, styid);

                        entities.SaveChanges();

                    }
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
