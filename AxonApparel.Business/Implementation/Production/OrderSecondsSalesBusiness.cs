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
    public class OrderSecondsSalesBusiness : IOrderSecondsSalesBusiness
    {
        IOrderSecondsSalesRepository DespatchModel = new OrderSecondsSalesRepository();

        public Response<IList<DespatchAddGridDetail>> GetDespatchAddGridDet(int CompanyId, string OrderType, string RefNo, int storeid, string OrderNo, int Buyerid)
        {
            try
            {
                var DespatchGridDt = DespatchModel.GetDespatchAddGridDet(CompanyId, OrderType, RefNo, storeid, OrderNo, Buyerid).ToList();

                return new Response<IList<DespatchAddGridDetail>>(DespatchGridDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<DespatchAddGridDetail>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.OrderSalesInvoiceMas> GetDespatchInnerHeaderInfo(int Invid)
        {
            try
            {
                var DespatchHeaderDt = DespatchModel.GetDespatchInnerHeaderInfo(Invid);

                return new Response<Domain.OrderSalesInvoiceMas>(DespatchHeaderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.OrderSalesInvoiceMas>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.OrderSalesInvoiceDet>> GetDespatchInnerItemInfo(int Invid)
        {
            try
            {
                var DespatchHeaderDt = DespatchModel.GetDespatchInnerItemDetail(Invid).ToList();

                return new Response<IList<Domain.OrderSalesInvoiceDet>>(DespatchHeaderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<Domain.OrderSalesInvoiceDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Domain.OrderSalesInvoiceAddless>> GetAddlessDetails(int Invid)
        {
            try
            {
                var DespatchHeaderDt = DespatchModel.GetAddlessDetails(Invid).ToList();

                return new Response<IList<Domain.OrderSalesInvoiceAddless>>(DespatchHeaderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<Domain.OrderSalesInvoiceAddless>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<IList<Domain.OrderSalesInvoiceDet>> GetDespatchInnerItemInfoDespatch(int Invid)
        {
            try
            {
                var DespatchHeaderDt = DespatchModel.GetDespatchInnerItemDetailDespatch(Invid).ToList();

                return new Response<IList<Domain.OrderSalesInvoiceDet>>(DespatchHeaderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<Domain.OrderSalesInvoiceDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.DespatchMainGridProperty>> GetMaindt(int CompanyId, string Fromdate, string Todate, string OrderType, string RefNo, string OrderNo, int Buyerid)
        {
            try
            {
                var getmaindt = DespatchModel.GetMainData(CompanyId, Fromdate, Todate, OrderType, RefNo, OrderNo, Buyerid);

                return new Response<IList<Domain.DespatchMainGridProperty>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.DespatchMainGridProperty>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.OrderSalesInvoiceDet>> GetAddItemDetails(string ShipRowId)
        {
            try
            {
                var DespatchHeaderDt = DespatchModel.GetAddItemDetails(ShipRowId).ToList();

                return new Response<IList<Domain.OrderSalesInvoiceDet>>(DespatchHeaderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<Domain.OrderSalesInvoiceDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.OrderSalesInvoiceMas>> GetInvdet(int compid)
        {
            try
            {
                var DespatchHeaderDt = DespatchModel.GetInvdet(compid).ToList();

                return new Response<IList<Domain.OrderSalesInvoiceMas>>(DespatchHeaderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<Domain.OrderSalesInvoiceMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<bool> Add(Domain.OrderSalesInvoiceMas DespatAdd)
        {
            try
            {
                //Insert into DespatchMas
                Repository.OrderSalesInvoiceMas mas = new Repository.OrderSalesInvoiceMas()
                {
                    Invid = DespatAdd.Invid,
                    companyid = DespatAdd.companyid,
                    buyerid = DespatAdd.buyerid,
                    conssigneeid = DespatAdd.conssigneeid,
                    notify = DespatAdd.notify,
                    InvoiceNo = DespatAdd.InvoiceNo,
                    invoicedate = DespatAdd.invoicedate,
                    refno = DespatAdd.refno,
                    refdate = DespatAdd.refdate,
                    portofloading = DespatAdd.portofloading,
                    destination = DespatAdd.destination,
                    portofdischarge = DespatAdd.portofdischarge,
                    shipmode = DespatAdd.shipmode,
                    systemid = DespatAdd.systemid,
                    payment = DespatAdd.payment,
                    Precarriage = DespatAdd.Precarriage,
                    placeofrecpt = DespatAdd.placeofrecpt,
                    Vesselno = DespatAdd.Vesselno,
                    MarksNos = DespatAdd.MarksNos,
                    Totalcartons = DespatAdd.Totalcartons,
                    Totalgrosswgt = DespatAdd.Totalgrosswgt,
                    Totalnetwgt = DespatAdd.Totalnetwgt,
                    currencyid = DespatAdd.currencyid,
                    Exrate = DespatAdd.Exrate,
                    SBillNo = DespatAdd.SBillNo,
                    SBillDate = DespatAdd.SBillDate,
                    CTDNo = DespatAdd.CTDNo,
                    CTDDate = DespatAdd.CTDDate,
                    LCNo = DespatAdd.LCNo,
                    LCDate = DespatAdd.LCDate,
                    LCtype = DespatAdd.LCtype,
                    Statement = DespatAdd.Statement,
                    StatementCode = DespatAdd.StatementCode,
                    StatementType = DespatAdd.StatementType,
                    SchemeCode = DespatAdd.SchemeCode,
                    ContainerNo = DespatAdd.ContainerNo,
                };

                var JList = new List<Repository.OrderSalesInvoiceDet>();
                foreach (var jdet in DespatAdd.Detlist)
                {
                    JList.Add(new Repository.OrderSalesInvoiceDet
                    {
                        Invdetid = jdet.Invdetid,
                        Invid = jdet.Invid,
                        Itemid = jdet.Itemid,
                        OrderNo = jdet.OrderNo,
                        Articleno = jdet.Articleno,
                        HsCode = jdet.HsCode,
                        description = jdet.description,
                        qty = jdet.qty,
                        rate = jdet.rate,
                        amount = jdet.amount,
                        ShipRowId = jdet.ShipRowId,
                        Fcarton=jdet.Fcarton,
                        Tcarton=jdet.Tcarton,
                        Totcarton=jdet.Totcarton,
                        GRwgt=jdet.GRwgt,
                        NETwgt=jdet.NETwgt
                    });
                }

                var AList = new List<Repository.OrderSalesInvoiceAddless>();
                if (DespatAdd.Acclist != null)
                {
                    foreach (var jdet in DespatAdd.Acclist)
                    {
                        AList.Add(new Repository.OrderSalesInvoiceAddless
                        {
                            InvId = jdet.InvId,
                            InvAddLessid = jdet.InvAddLessid,
                            AddLessid = jdet.addless_id,
                            Percentage = jdet.percentage,
                            Amount = jdet.amount
                        });
                    }
                }

                var result = DespatchModel.Add(mas, JList, AList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception ex)
            {

                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");
            }

        }

        public Common.Response<bool> Update(Domain.OrderSalesInvoiceMas DespatAdd)
        {
            try
            {
                //Insert into DespatchMas
                Repository.OrderSalesInvoiceMas mas = new Repository.OrderSalesInvoiceMas()
                {
                    Invid = DespatAdd.Invid,
                    companyid = DespatAdd.companyid,
                    buyerid = DespatAdd.buyerid,
                    conssigneeid = DespatAdd.conssigneeid,
                    notify = DespatAdd.notify,
                    InvoiceNo = DespatAdd.InvoiceNo,
                    invoicedate = DespatAdd.invoicedate,
                    refno = DespatAdd.refno,
                    refdate = DespatAdd.refdate,
                    portofloading = DespatAdd.portofloading,
                    destination = DespatAdd.destination,
                    portofdischarge = DespatAdd.portofdischarge,
                    shipmode = DespatAdd.shipmode,
                    systemid = DespatAdd.systemid,
                    payment = DespatAdd.payment,
                    Precarriage = DespatAdd.Precarriage,
                    placeofrecpt = DespatAdd.placeofrecpt,
                    Vesselno = DespatAdd.Vesselno,
                    MarksNos = DespatAdd.MarksNos,
                    Totalcartons = DespatAdd.Totalcartons,
                    Totalgrosswgt = DespatAdd.Totalgrosswgt,
                    Totalnetwgt = DespatAdd.Totalnetwgt,
                    currencyid = DespatAdd.currencyid,
                    Exrate = DespatAdd.Exrate,

                    SBillNo = DespatAdd.SBillNo,
                    SBillDate = DespatAdd.SBillDate,
                    CTDNo = DespatAdd.CTDNo,
                    CTDDate = DespatAdd.CTDDate,
                    LCNo = DespatAdd.LCNo,
                    LCDate = DespatAdd.LCDate,
                    LCtype = DespatAdd.LCtype,
                    Statement = DespatAdd.Statement,
                    StatementCode = DespatAdd.StatementCode,
                    StatementType = DespatAdd.StatementType,
                    SchemeCode = DespatAdd.SchemeCode,
                    ContainerNo = DespatAdd.ContainerNo,
                };

                var JList = new List<Repository.OrderSalesInvoiceDet>();
                foreach (var jdet in DespatAdd.Detlist)
                {
                    JList.Add(new Repository.OrderSalesInvoiceDet
                    {
                        Invdetid = jdet.Invdetid,
                        Invid = jdet.Invid,
                        Itemid = jdet.Itemid,
                        OrderNo = jdet.OrderNo,
                        Articleno = jdet.Articleno,
                        HsCode = jdet.HsCode,
                        description = jdet.description,
                        qty = jdet.qty,
                        rate = jdet.rate,
                        amount = jdet.amount,
                        ShipRowId=jdet.ShipRowId,
                        Fcarton = jdet.Fcarton,
                        Tcarton = jdet.Tcarton,
                        Totcarton = jdet.Totcarton,
                        GRwgt = jdet.GRwgt,
                        NETwgt = jdet.NETwgt
                    });
                }


                var AList = new List<Repository.OrderSalesInvoiceAddless>();
                if (DespatAdd.Acclist != null)
                {
                    foreach (var jdet in DespatAdd.Acclist)
                    {
                        AList.Add(new Repository.OrderSalesInvoiceAddless
                        {
                            InvId = jdet.InvId,
                            InvAddLessid = jdet.InvAddLessid,
                            AddLessid = jdet.addless_id,
                            Percentage = jdet.percentage,
                            Amount = jdet.amount
                        });
                    }
                }

                var result = DespatchModel.Update(mas, JList, AList);

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");

            }
            catch (Exception ex)
            {

                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");
            }

        }

        public Common.Response<bool> Delete(Domain.OrderSalesInvoiceMas DespatAdd)
        {
            try
            {
                //Insert into DespatchMas
                Repository.OrderSalesInvoiceMas mas = new Repository.OrderSalesInvoiceMas()
                {
                    Invid = DespatAdd.Invid,
                    companyid = DespatAdd.companyid,
                    buyerid = DespatAdd.buyerid,
                    conssigneeid = DespatAdd.conssigneeid,
                    notify = DespatAdd.notify,
                    InvoiceNo = DespatAdd.InvoiceNo,
                    invoicedate = DespatAdd.invoicedate,
                    refno = DespatAdd.refno,
                    refdate = DespatAdd.refdate,
                    portofloading = DespatAdd.portofloading,
                    destination = DespatAdd.destination,
                    portofdischarge = DespatAdd.portofdischarge,
                    shipmode = DespatAdd.shipmode,
                    systemid = DespatAdd.systemid,
                    payment = DespatAdd.payment,
                    Precarriage = DespatAdd.Precarriage,
                    placeofrecpt = DespatAdd.placeofrecpt,
                    Vesselno = DespatAdd.Vesselno,
                    MarksNos = DespatAdd.MarksNos,
                    Totalcartons = DespatAdd.Totalcartons,
                    Totalgrosswgt = DespatAdd.Totalgrosswgt,
                    Totalnetwgt = DespatAdd.Totalnetwgt,
                    currencyid = DespatAdd.currencyid,
                    Exrate = DespatAdd.Exrate,
                    SBillNo = DespatAdd.SBillNo,
                    SBillDate = DespatAdd.SBillDate,
                    CTDNo = DespatAdd.CTDNo,
                    CTDDate = DespatAdd.CTDDate,
                    LCNo = DespatAdd.LCNo,
                    LCDate = DespatAdd.LCDate,
                    LCtype = DespatAdd.LCtype,
                    Statement = DespatAdd.Statement,
                    StatementCode = DespatAdd.StatementCode,
                    StatementType = DespatAdd.StatementType,
                    SchemeCode = DespatAdd.SchemeCode,
                    ContainerNo = DespatAdd.ContainerNo,
                };

                var JList = new List<Repository.OrderSalesInvoiceDet>();
                foreach (var jdet in DespatAdd.Detlist)
                {
                    JList.Add(new Repository.OrderSalesInvoiceDet
                    {
                        Invdetid = jdet.Invdetid,
                        Invid = jdet.Invid,
                        Itemid = jdet.Itemid,
                        OrderNo = jdet.OrderNo,
                        Articleno = jdet.Articleno,
                        HsCode = jdet.HsCode,
                        description = jdet.description,
                        qty = jdet.qty,
                        rate = jdet.rate,
                        amount = jdet.amount,
                        ShipRowId = jdet.ShipRowId,
                        Fcarton = jdet.Fcarton,
                        Tcarton = jdet.Tcarton,
                        Totcarton = jdet.Totcarton,
                        GRwgt = jdet.GRwgt,
                        NETwgt = jdet.NETwgt
                    });
                }

                var AList = new List<Repository.OrderSalesInvoiceAddless>();
                foreach (var jdet in DespatAdd.Acclist)
                {
                    AList.Add(new Repository.OrderSalesInvoiceAddless
                    {
                        InvId = jdet.InvId,
                        InvAddLessid = jdet.InvAddLessid,
                        AddLessid = jdet.addless_id,
                        Percentage = jdet.percentage,
                        Amount = jdet.amount
                    });
                }


                var result = DespatchModel.Delete(mas, JList, AList);

                return new Response<bool>(result, Status.SUCCESS, "Deleted Successfully");

            }
            catch (Exception ex)
            {

                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Please try again");
            }

        }

    }
}
