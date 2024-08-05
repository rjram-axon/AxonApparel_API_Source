using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;   

namespace AxonApparel.Repository
{
    public class JobOrderDetailRepository:IJobOrderDetailRepository
    {
        OrderEntities entities = new OrderEntities();

        public IQueryable<JobOrderDetList> GetJobOrderDet()
        {
            var query = (from a in entities.Proc_AxonApparel_GetJobOrderDetails()
                         select new JobOrderDetList
                         {
                             Buy_Ord_MasId=a.Buy_Ord_MasId,
                             JobOrderId=a.JobOrderID,
                             JobOrderNo=a.Job_Ord_No,
                             JobOrdDate=(DateTime)a.Job_Ord_Date,
                             companyid=(int)a.companyid,
                             CompanyName=a.company,
                             Buyer=a.buyer,
                             BuyerId=(int)a.buyerid,
                             OrderNo=a.Order_No,
                             OrderDate=(DateTime)a.Order_Date,
                             RefNo = a.Ref_no,
                             StyleId=a.Styleid,
                             StyleName=a.style,
                             StyleRowId=a.StyleRowid,
                             SupplierId=(int)a.supplierid,
                             ProdUnit=a.ProdUnit,
                             Merchandiser=a.Merchandiser,
                             MerchandiserId=(int)a.Merchandiserid,
                             UnitOrOther=a.unit_or_other,
                             Amend=a.Amend,
                             DespatchedClosed=a.Despatch_Closed,
                             JobOrWork=a.JobOrWork,
                             IsApproved=a.Isapproved,
                             ToApproved=a.ToApprove,    
                             Quantity=(int)a.quantity,
                         }).AsQueryable();
            return query;
        }

        public IList<JobOrderShipmentlist> GetJobOrderShip(string Orderno, int StyleId)
        {
            try
            {
                var query = (from a in entities.Proc_Apparel_GetJobOrderShipmentDetails(Orderno,StyleId)
                             select new JobOrderShipmentlist
                             {
                                 shiprowid=a.shiprowid,
                                 buyordship=a.buy_ord_ship,
                                 shipdate=(DateTime)a.ship_date,
                                 Country=a.country,
                                 Ordqty=(int)a.Ordqty,
                                 //jobqty = (int)a.job_qty,
                                 jobqty = (int)(a.job_qty == null ? 0 : a.job_qty),
                                 deliverydate=(DateTime)a.delivery_date                                 
                             }).ToList();
                return query;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IList<JobOrderItemlist> GetJobOrderItem(string JobOrderno)
        {
            try
            {
                var query = (from a in entities.Proc_Apparel_GetJobOrderItemDetails(JobOrderno)
                             select new JobOrderItemlist
                             {
                                 JobOrderNo=a.Job_ord_No,
                                 BuyOrdShip=a.Buy_Ord_Ship,
                                 JobQuantity=(int)a.JobQuantity,
                                 DeliveryDate=(DateTime)a.Delivery_Date,
                                 ColorId = (int)a.ColorID,
                                 Color=a.Color,
                                 ItemId = (int)a.ItemId,
                                 Item=a.Item,
                                 SizeId = (int)a.SizeID,
                                 Size=a.size,
                                 JQuantity = (int)a.jQuantity,
                                 ActualJobQuantity = (int)a.ActualJobQty,
                                 Rate=a.Rate
                             }).ToList();
                return query;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IQueryable<JobOrderDetList> GetDataofJobOrderDet(int JobOrderId)
        {
            string jobordernumber = null;

            var JobOrderNo = entities.Job_Ord_Mas.Where(c => c.ID == JobOrderId).FirstOrDefault();

            if (JobOrderNo != null)
            {
                jobordernumber = JobOrderNo.Job_Ord_No;
            }

            var query = (from a in entities.Proc_Apparel_GetJobOrderDetails(jobordernumber)
                         select new JobOrderDetList
                         {
                             OrderNo = a.Order_No,
                             JobOrderNo = a.Job_Ord_No,
                             OrderDate = (DateTime)a.Job_Ord_Date,
                             Issuedate = (DateTime)a.Issue_Date,
                             Job_Order_RefNo = (a.Job_Order_Ref == null ? string.Empty : a.Job_Order_Ref),
                             Rate = a.Rate,
                             RateType = a.ratetype,
                             Buyer = a.buyer,
                             BuyerId = (int)a.buyerid,
                             StyleId = (a.StyleID == null ? 0 : a.StyleID),
                             StyleName = a.style,
                             ProductionQty = (int)(a.ProductionQty == null ? 0 : a.ProductionQty),
                             Manager = a.Manager,
                             ManagerId = a.ManagerID,
                             Merchendiser = a.Merchandiser,
                             MerchandiserId = a.MerchandiserID,
                             QC = a.Qc,
                             QCId = a.QcID,
                             Stage = (a.Stage == null ? string.Empty : a.Stage),
                             StageId = (int)(a.Stageid == null ? 0 : a.Stageid),
                             UnitorOther = a.Unit_Or_Other,
                             CompanyUnit = a.CompanyUnit,
                             CompanyUnitId = (int)a.Id,
                             SupplierName = (a.Supplier == null ? string.Empty : a.Supplier),
                             SupplierId = (int)(a.SupplierID == null ? 0 : a.SupplierID),
                             ToApprove = (a.ToApprove == null ? string.Empty : a.ToApprove),
                             ToApproveId = (int)(a.ToApproveId == 0 ? 0 : a.ToApproveId),
                             ExcessPer = (int)a.ExcessPer,
                             Currency = a.Currency,
                             CurrencyId = (int)a.Currencyid,
                             Exchange = (int)(a.Exchange == null ? 0 : a.Exchange),
                             DecimalPlace = (int)(a.DecimalPlace == null ? 0 : a.DecimalPlace),
                             Consumption = a.Consumption,
                             RateDesc = a.Rate_Desc,
                             Remarks = a.remarks,
                             JobOrdType = a.jobordtype,
                             CompanyUnitAddress = a.Addres
                         }).AsQueryable();
            return query;
        }
    }
}
