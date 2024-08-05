using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class JobOrderDetailBusiness : IJobOrderDetailBusiness
    {
        private IJobOrderDetailRepository strrep = new JobOrderDetailRepository();

        public Response<IQueryable<JobOrderDetList>> GetJobOrderDetail()
        {
            try
            {
                var strlist = strrep.GetJobOrderDet();
                return new Response<IQueryable<Domain.JobOrderDetList>>(strlist.Select(m => new Domain.JobOrderDetList
                {
                    Buy_Ord_MasId=m.Buy_Ord_MasId,
                    JobOrderId=m.JobOrderId,
                    JobOrderNo = m.JobOrderNo,
                    JobOrdDate = (DateTime)m.JobOrdDate,
                    companyid = (int)m.companyid,
                    CompanyName = m.CompanyName,
                    Buyer = m.Buyer,
                    BuyerId = (int)m.BuyerId,
                    OrderNo = m.OrderNo,
                    OrderDate = (DateTime)m.OrderDate,
                    RefNo = m.RefNo,
                    StyleId = m.StyleId,
                    StyleName = m.StyleName,
                    StyleRowId = m.StyleRowId,
                    SupplierId = (int)m.SupplierId,
                    ProdUnit = m.ProdUnit,
                    Merchandiser = m.Merchandiser,
                    MerchandiserId = (int)m.MerchandiserId,
                    UnitOrOther = m.UnitOrOther,
                    Amend = m.Amend,
                    DespatchedClosed = m.DespatchedClosed,
                    JobOrWork = m.JobOrWork,
                    IsApproved = m.IsApproved,
                    ToApproved = m.ToApproved,   
                    Quantity=m.Quantity,
                        
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.JobOrderDetList>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<IList<JobOrderShipmentlist>> GetJobOrderShipDetail(string Orderno,int StyleId)
        {
            try
            {
                var strlist = strrep.GetJobOrderShip(Orderno,StyleId);
                return new Response<IList<Domain.JobOrderShipmentlist>>(strlist.Select(m => new Domain.JobOrderShipmentlist
                {
                    shiprowid=m.shiprowid,
                    buyordship=m.buyordship,
                    shipdate=m.shipdate,
                    Country=m.Country,
                    Ordqty=m.Ordqty,
                    jobqty=m.jobqty,
                    deliverydate=m.deliverydate
                }).ToList(), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.JobOrderShipmentlist>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<IList<JobOrderItemlist>> GetJobOrderItemDetail(string JobOrderno)
        {
            try
            {
                var strlist = strrep.GetJobOrderItem(JobOrderno);
                return new Response<IList<Domain.JobOrderItemlist>>(strlist.Select(m => new Domain.JobOrderItemlist
                {
                    JobOrderNo = m.JobOrderNo,
                    BuyOrdShip = m.BuyOrdShip,
                    JobQuantity = (int)m.JobQuantity,
                    DeliveryDate = (DateTime)m.DeliveryDate,
                    ColorId = (int)m.ColorId,
                    Color=m.Color,
                    ItemId = (int)m.ItemId,
                    Item=m.Item,
                    SizeId = (int)m.SizeId,
                    Size=m.Size,
                    JQuantity = (int)m.JQuantity,
                    ActualJobQuantity = (int)m.ActualJobQuantity,
                    Rate = m.Rate
                }).ToList(), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.JobOrderItemlist>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<IQueryable<JobOrderDetList>> GetDataofJobOrder(int JobOrderId)
        {
            try
            {
                var strlist = strrep.GetDataofJobOrderDet(JobOrderId);
                return new Response<IQueryable<Domain.JobOrderDetList>>(strlist.Select(m => new Domain.JobOrderDetList
                {
                    OrderNo = m.OrderNo,
                    JobOrderNo=m.JobOrderNo,
                    OrderDate = m.OrderDate,
                    Issuedate = m.Issuedate,
                    Job_Order_RefNo = m.Job_Order_RefNo,
                    Rate = m.Rate,
                    RateType = m.RateType,
                    Buyer = m.Buyer,
                    BuyerId = m.BuyerId,
                    StyleId = m.StyleId,
                    StyleName = m.StyleName,
                    ProductionQty = m.ProductionQty,
                    Manager = m.Manager,
                    ManagerId = m.ManagerId,
                    Merchendiser = m.Merchandiser,
                    MerchandiserId = m.MerchandiserId,
                    QC = m.QC,
                    QCId = m.QCId,
                    Stage = m.Stage,
                    StageId = m.StageId,
                    UnitorOther = m.UnitorOther,
                    CompanyUnit = m.CompanyUnit,
                    CompanyUnitId = m.CompanyUnitId,
                    SupplierName = m.SupplierName,
                    SupplierId = m.SupplierId,
                    ToApprove = m.ToApprove,
                    ToApproveId = m.ToApproveId,
                    ExcessPer = m.ExcessPer,
                    Currency = m.Currency,
                    CurrencyId = m.CurrencyId,
                    Exchange = m.Exchange,
                    DecimalPlace = m.DecimalPlace,
                    Consumption = m.Consumption,
                    RateDesc = m.RateDesc,
                    Remarks = m.Remarks,
                    JobOrdType = m.JobOrdType,
                    CompanyUnitAddress=m.CompanyUnitAddress
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.JobOrderDetList>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }
    }
}
