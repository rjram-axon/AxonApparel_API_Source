using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Repository;
namespace AxonApparel.Business
{
    public class OpenDebitBusiness : IOpenDebitBusiness
    {

        IOpenDebitRepository OPRep = new OpenDebitRepository();

        public Response<bool> CreateDebitEntry(Domain.OpenDebit DebEntry)
        {
            int? CreBy = 0;
            int? LegID = 0;
            int? VouID = 0;
            int? StyID = 0;

            try
            {


                if (DebEntry.CreatedBy == 0)
                {
                    CreBy = null;
                }
                else
                {
                    CreBy = DebEntry.CreatedBy;
                }

                if (DebEntry.ledgerid == 0)
                {
                    LegID = null;
                }
                else
                {
                    LegID = DebEntry.ledgerid;
                }

                if (DebEntry.voucherid == 0)
                {
                    VouID = null;
                }
                else
                {
                    VouID = DebEntry.voucherid;
                }

                if (DebEntry.Styleid == 0)
                {
                    StyID = null;
                }
                else
                {
                    StyID = DebEntry.Styleid;
                }

                //var opDeID = OPRep.AddData(new AxonApparel.Repository.OpenDebitMas
                //{


                //    DebitNo = DebEntry.DebitNo,
                //    DebitDate = DebEntry.DebitDate,
                //    Companyid = DebEntry.Companyid,
                //    Partyid = DebEntry.Partyid,
                //    RefNo = DebEntry.RefNo,
                //    RefDate = DebEntry.RefDate,
                //    Processid = DebEntry.Processid,
                //    Amount = DebEntry.Amount,
                //    Remarks = DebEntry.Remarks,
                //    voucherid = VouID,
                //    ledgerid = LegID,
                //    OpenOrOrder = DebEntry.OpenOrOrder,
                //    OrderType = DebEntry.OrderType,
                //    Order_No = DebEntry.Order_No,
                //    Styleid = StyID,
                //    DebitOrCredit = DebEntry.DebitOrCredit,
                //    CreatedBy = CreBy,
                //    VehicleNo = DebEntry.VehicleNo,
                //    Addless_amount = DebEntry.Addless_amount,
                //    AddLessManualOrFormula = DebEntry.AddLessManualOrFormula,
                //    CurrencyID = DebEntry.CurrencyID,
                //    ExchangeRate = DebEntry.ExchangeRate,
                //});
                AxonApparel.Repository.OpenDebitMas opDebInsert = new AxonApparel.Repository.OpenDebitMas
                {

                    DebitNo = DebEntry.DebitNo,
                    DebitDate = DebEntry.DebitDate,
                    Companyid = DebEntry.Companyid,
                    Partyid = DebEntry.Partyid,
                    RefNo = DebEntry.RefNo,
                    RefDate = DebEntry.RefDate,
                    Processid = DebEntry.Processid,
                    Amount = DebEntry.Amount,
                    Remarks = DebEntry.Remarks,
                    voucherid = VouID,
                    ledgerid = LegID,
                    OpenOrOrder = DebEntry.OpenOrOrder,
                    OrderType = DebEntry.OrderType,
                    Order_No = DebEntry.Order_No,
                    Styleid = StyID,
                    DebitOrCredit = DebEntry.DebitOrCredit,
                    CreatedBy = CreBy,
                    VehicleNo = DebEntry.VehicleNo,
                    Addless_amount = DebEntry.Addless_amount,
                    AddLessManualOrFormula = DebEntry.AddLessManualOrFormula,
                    CurrencyID = DebEntry.CurrencyID,
                    ExchangeRate = DebEntry.ExchangeRate,

                };

                var ItmList = new List<OpenDebitItemDet>();

                foreach (var PItem in DebEntry.ItemOpenDet)
                {




                    if (PItem.Amt > 0)
                    {

                        ItmList.Add(new OpenDebitItemDet
                        {
                            DebitID = PItem.DebitID,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            Quantity = PItem.Quantity,
                            Rate = PItem.Rate,
                            Order_No = PItem.OrdNo,
                            RefNo = PItem.Refno,
                            WorkNo = PItem.JobNo,
                        });
                    }
                }
                //var result1 = OPRep.AddDetData(ItmList);


                var AccListDetails = new List<Open_Debit_Addless>();
                if (DebEntry.OpenAddless != null)
                {
                    foreach (var Acc in DebEntry.OpenAddless)
                    {


                        AccListDetails.Add(new Open_Debit_Addless
                        {

                            Debit_AddLessId = Acc.OpenDebitAddlessid,
                            Debit_Id = Acc.DebitId,
                            addless_id = Acc.Addlessid,
                            percentage = Acc.Percentage,
                            aorl = Acc.PlusOrMinus,
                            amount = Acc.Amount,

                        });
                    }
                }
                var result = OPRep.AddDetAccData(opDebInsert, ItmList, AccListDetails);



                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.OpenDebit>> GetDataMainDebitDetails(int? Companyid, int? Partyid, int? Processid, string OrderType, string DebitOrCredit, string FromDate, string ToDate)
        {
            try
            {
                var PWO = OPRep.GetDataMainOpDebRepDetails(Companyid, Partyid, Processid, OrderType, DebitOrCredit, FromDate, ToDate);

                return new Response<IQueryable<Domain.OpenDebit>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.OpenDebit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.OpenDebit>> GetMainDebProcess(int? Companyid, int? Partyid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate)
        {
            try
            {
                var PWO = OPRep.GetDataMainOpProcessRepDetails(Companyid, Partyid, DebitId, OrderType, DebitOrCredit, FromDate, ToDate);

                return new Response<IQueryable<Domain.OpenDebit>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.OpenDebit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.OpenDebit>> GetMainDebBussSupl(int? Companyid, int? Processid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate)
        {
            try
            {
                var PWO = OPRep.GetDataMainOpSuppRepDetails(Companyid, Processid, DebitId, OrderType, DebitOrCredit, FromDate, ToDate);

                return new Response<IQueryable<Domain.OpenDebit>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.OpenDebit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<Domain.OpenDebit>> GetDataDebitMainDetails(int? Companyid, int? Processid, int? Partyid, int? DebitId, string OrderType, string DebitOrCredit, string FromDate, string ToDate, string orderno, string refno)
        {
            try
            {
                var PWO = OPRep.GetDataDebitMainRepDetails(Companyid, Processid, Partyid, DebitId, OrderType, DebitOrCredit, FromDate, ToDate, orderno, refno);

                return new Response<IQueryable<Domain.OpenDebit>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.OpenDebit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        

        public Response<IQueryable<Domain.OpenDebit>> GetDebitEditDetails(int Id)
        {
            try
            {
                var PWO = OPRep.GetDataRepEditDebitDetails(Id);

                return new Response<IQueryable<Domain.OpenDebit>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.OpenDebit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.OpenDebit>> LoadmailDetails(int Id)
        {
            try
            {
                var PWO = OPRep.LoadmailDetails(Id);

                return new Response<IQueryable<Domain.OpenDebit>>(PWO, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.OpenDebit>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IList<Domain.OpenDebitDet>> GetStoresDebEntryItemEdit(int Id)
        {
            try
            {
                var ProductWO = OPRep.GetDataDebRepEditItemDetails(Id);

                return new Response<IList<Domain.OpenDebitDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.OpenDebitDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateDebitEntry(Domain.OpenDebit PDUEntry)
        {
            int? CreBy = 0;
            int? LegID = 0;
            int? VouID = 0;
            int? StyID = 0;

            try
            {


                if (PDUEntry.CreatedBy == 0)
                {
                    CreBy = null;
                }
                else
                {
                    CreBy = PDUEntry.CreatedBy;
                }

                if (PDUEntry.ledgerid == 0)
                {
                    LegID = null;
                }
                else
                {
                    LegID = PDUEntry.ledgerid;
                }

                if (PDUEntry.voucherid == 0)
                {
                    VouID = null;
                }
                else
                {
                    VouID = PDUEntry.voucherid;
                }

                if (PDUEntry.Styleid == 0)
                {
                    StyID = null;
                }
                else
                {
                    StyID = PDUEntry.Styleid;
                }




                AxonApparel.Repository.OpenDebitMas opDebEdit = new AxonApparel.Repository.OpenDebitMas
                {

                    DebitId = PDUEntry.DebitId,
                    DebitNo = PDUEntry.DebitNo,
                    DebitDate = PDUEntry.DebitDate,
                    Companyid = PDUEntry.Companyid,
                    Partyid = PDUEntry.Partyid,
                    RefNo = PDUEntry.RefNo,
                    RefDate = PDUEntry.RefDate,
                    Processid = PDUEntry.Processid,
                    Amount = PDUEntry.Amount,
                    Remarks = PDUEntry.Remarks,
                    voucherid = VouID,
                    ledgerid = LegID,
                    OpenOrOrder = PDUEntry.OpenOrOrder,
                    OrderType = PDUEntry.OrderType,
                    Order_No = PDUEntry.Order_No,
                    Styleid = StyID,
                    DebitOrCredit = PDUEntry.DebitOrCredit,
                    CreatedBy = CreBy,
                    VehicleNo = PDUEntry.VehicleNo,
                    Addless_amount = PDUEntry.Addless_amount,
                    AddLessManualOrFormula = PDUEntry.AddLessManualOrFormula,
                    CurrencyID = PDUEntry.CurrencyID,
                    ExchangeRate = PDUEntry.ExchangeRate,

                };

                var ItmList = new List<OpenDebitItemDet>();

                foreach (var PItem in PDUEntry.ItemOpenDet)
                {




                    if (PItem.Amt > 0)
                    {

                        ItmList.Add(new OpenDebitItemDet
                        {
                            DebitID = PItem.DebitID,
                            DebitDetId = PItem.DebitDetId,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            Quantity = PItem.Quantity,
                            Rate = PItem.Rate,
                            Order_No = PItem.OrdNo,
                            RefNo = PItem.Refno,
                            WorkNo = PItem.JobNo,
                        });
                    }
                }
                //var result1 = OPRep.UpdateDetData(ItmList, PDUEntry.DebitId);


                var AccListDetails = new List<Open_Debit_Addless>();
                if (PDUEntry.OpenAddless != null)
                {
                    foreach (var Acc in PDUEntry.OpenAddless)
                    {


                        AccListDetails.Add(new Open_Debit_Addless
                        {

                            Debit_AddLessId = Acc.OpenDebitAddlessid,
                            Debit_Id = Acc.DebitId,
                            addless_id = Acc.Addlessid,
                            percentage = Acc.Percentage,
                            aorl = Acc.PlusOrMinus,
                            amount = Acc.Amount,

                        });
                    }
                }
                var result2 = OPRep.UpdateDetAccData(opDebEdit, ItmList, AccListDetails, PDUEntry.DebitId);

                //Edit

                var EItmList = new List<OpenDebitItemDet>();

                foreach (var PItem in PDUEntry.ItemOpenDet)
                {




                    if (PItem.Amt > 0)
                    {

                        EItmList.Add(new OpenDebitItemDet
                        {
                            DebitID = PDUEntry.DebitId,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            Quantity = PItem.Quantity,
                            Rate = PItem.Rate,
                            Order_No = PItem.OrdNo,
                            RefNo = PItem.Refno,
                            WorkNo = PItem.JobNo,
                        });
                    }
                }
                //var result4 = OPRep.AddDetData(EItmList);


                var EAccListDetails = new List<Open_Debit_Addless>();
                if (PDUEntry.OpenAddless != null)
                {
                    foreach (var Acc in PDUEntry.OpenAddless)
                    {


                        EAccListDetails.Add(new Open_Debit_Addless
                        {

                            Debit_AddLessId = Acc.OpenDebitAddlessid,
                            Debit_Id = PDUEntry.DebitId,
                            addless_id = Acc.Addlessid,
                            percentage = Acc.Percentage,
                            aorl = Acc.PlusOrMinus,
                            amount = Acc.Amount,

                        });
                    }
                }
                var result3 = OPRep.AddDetAccData(opDebEdit, EItmList, EAccListDetails);
                //

                return new Response<bool>(result3, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Domain.OpenDebitAddless>> GetStoresDebEntryAddlessEdit(int Id)
        {
            try
            {
                var ProductWO = OPRep.GetDataDebRepEditAddlessDetails(Id);

                return new Response<IList<Domain.OpenDebitAddless>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.OpenDebitAddless>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> DeleteDebitEntry(Domain.OpenDebit PDDEntry)
        {
            int? CreBy = 0;
            int? LegID = 0;
            int? VouID = 0;
            int? StyID = 0;

            try
            {


                if (PDDEntry.CreatedBy == 0)
                {
                    CreBy = null;
                }
                else
                {
                    CreBy = PDDEntry.CreatedBy;
                }

                if (PDDEntry.ledgerid == 0)
                {
                    LegID = null;
                }
                else
                {
                    LegID = PDDEntry.ledgerid;
                }

                if (PDDEntry.voucherid == 0)
                {
                    VouID = null;
                }
                else
                {
                    VouID = PDDEntry.voucherid;
                }

                if (PDDEntry.Styleid == 0)
                {
                    StyID = null;
                }
                else
                {
                    StyID = PDDEntry.Styleid;
                }




                AxonApparel.Repository.OpenDebitMas opDebEdit = new AxonApparel.Repository.OpenDebitMas
                {

                    DebitId = PDDEntry.DebitId,
                    DebitNo = PDDEntry.DebitNo,
                    DebitDate = PDDEntry.DebitDate,
                    Companyid = PDDEntry.Companyid,
                    Partyid = PDDEntry.Partyid,
                    RefNo = PDDEntry.RefNo,
                    RefDate = PDDEntry.RefDate,
                    Processid = PDDEntry.Processid,
                    Amount = PDDEntry.Amount,
                    Remarks = PDDEntry.Remarks,
                    voucherid = VouID,
                    ledgerid = LegID,
                    OpenOrOrder = PDDEntry.OpenOrOrder,
                    OrderType = PDDEntry.OrderType,
                    Order_No = PDDEntry.Order_No,
                    Styleid = StyID,
                    DebitOrCredit = PDDEntry.DebitOrCredit,
                    CreatedBy = CreBy,
                    VehicleNo = PDDEntry.VehicleNo,
                    Addless_amount = PDDEntry.Addless_amount,
                    AddLessManualOrFormula = PDDEntry.AddLessManualOrFormula,
                    CurrencyID = PDDEntry.CurrencyID,
                    ExchangeRate = PDDEntry.ExchangeRate,

                };

                var ItmList = new List<OpenDebitItemDet>();

                foreach (var PItem in PDDEntry.ItemOpenDet)
                {




                    if (PItem.Amt > 0)
                    {

                        ItmList.Add(new OpenDebitItemDet
                        {
                            DebitID = PItem.DebitID,
                            DebitDetId = PItem.DebitDetId,
                            Itemid = PItem.Itemid,
                            Colorid = PItem.Colorid,
                            Sizeid = PItem.Sizeid,
                            Quantity = PItem.Quantity,
                            Rate = PItem.Rate,
                            Order_No = PItem.OrdNo,
                            RefNo = PItem.Refno,
                            WorkNo = PItem.JobNo,
                        });
                    }
                }
                //var result1 = OPRep.UpdateDetData(ItmList, PDUEntry.DebitId);


                var AccListDetails = new List<Open_Debit_Addless>();
                if (PDDEntry.OpenAddless != null)
                {
                    foreach (var Acc in PDDEntry.OpenAddless)
                    {


                        AccListDetails.Add(new Open_Debit_Addless
                        {

                            Debit_AddLessId = Acc.OpenDebitAddlessid,
                            Debit_Id = Acc.DebitId,
                            addless_id = Acc.Addlessid,
                            percentage = Acc.Percentage,
                            aorl = Acc.PlusOrMinus,
                            amount = Acc.Amount,

                        });
                    }
                }
                var result = OPRep.DeleteDetAccData(opDebEdit, ItmList, AccListDetails, PDDEntry.DebitId);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
