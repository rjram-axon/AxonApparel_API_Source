using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Repository;


namespace AxonApparel.Business
{

    public class PaymentBusiness : IPaymentBusiness
    {
        IPaymentRepository repo = new PaymentRepository();

        public Response<IEnumerable<Domain.Bill_Adj_det>> AddList(int Supplierid, int Companyid,string Type)
        {
            try
            {
                var ProductWO = repo.AddList(Supplierid, Companyid, Type);

                return new Response<IEnumerable<Domain.Bill_Adj_det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.Bill_Adj_det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<Domain.Bill_Adj_mas>> GetmainList(int Supplierid, int Companyid, string Paymentno, string FromDate, string ToDate, string advance)
        {
            try
            {
                var ProductWO = repo.GetmainList(Supplierid, Companyid, Paymentno, FromDate, ToDate, advance);

                return new Response<IEnumerable<Domain.Bill_Adj_mas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.Bill_Adj_mas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<Domain.Bill_Adj_mas>> GetEditMas(int Transid)
        {
            try
            {
                var ProductWO = repo.GetEditMas(Transid);

                return new Response<IEnumerable<Domain.Bill_Adj_mas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.Bill_Adj_mas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<Domain.Bill_Adj_det>> GetEditDet(int Transid)
        {
            try
            {
                var ProductWO = repo.GetEditDet(Transid);

                return new Response<IEnumerable<Domain.Bill_Adj_det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.Bill_Adj_det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<Domain.Bill_Adj_mas>> GetPaymentNo(int Companyid)
        {
            try
            {
                var ProductWO = repo.GetPaymentNo(Companyid);

                return new Response<IEnumerable<Domain.Bill_Adj_mas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.Bill_Adj_mas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> Create(Domain.Bill_Adj_mas BulOrd)
        {

            try
            {
                AxonApparel.Repository.BIll_ADJ_mas MasInsert = new AxonApparel.Repository.BIll_ADJ_mas
                {
                    Trans_Type = BulOrd.Trans_Type,
                    Trans_No = BulOrd.Trans_No,
                    Trans_Date = BulOrd.Trans_Date,
                    Supplierid = BulOrd.Supplierid,
                    Type = BulOrd.Type,
                    Cheque_No = BulOrd.Cheque_No,
                    Cheque_Date = BulOrd.Cheque_Date,
                    Cheque_Amt = BulOrd.Cheque_Amt,
                    Remarks = BulOrd.Remarks,
                    Narration = BulOrd.Narration,
                    Bankid = BulOrd.Bankid,
                    Companyid = BulOrd.Companyid,
                    Trans_masid = BulOrd.Trans_masid,
                    Advance_Amt = BulOrd.Advance_Amt,
                    Mode = BulOrd.Mode,
                    CreatedBy = BulOrd.CreatedBy,
                };

                var DetList = new List<BIll_Adj_Det>();

                if (BulOrd.Det != null)
                {
                    foreach (var PCompItem in BulOrd.Det)
                    {
                        DetList.Add(new BIll_Adj_Det
                        {
                            Trans_Detid = PCompItem.Trans_Detid,
                            Trans_Masid = PCompItem.Trans_Masid,
                            Type = PCompItem.Type,
                            Pur_Inv_Id = PCompItem.Pur_Inv_Id,
                            Inv_Amount = PCompItem.Inv_Amount,
                            Adj_Amt = PCompItem.Adj_Amt,
                        });
                    }
                }

                var result = repo.AddDetData(MasInsert, DetList);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> Update(Domain.Bill_Adj_mas BulOrd)
        {

            try
            {
                AxonApparel.Repository.BIll_ADJ_mas MasInsert = new AxonApparel.Repository.BIll_ADJ_mas
                {
                    Trans_Type = BulOrd.Trans_Type,
                    Trans_No = BulOrd.Trans_No,
                    Trans_Date = BulOrd.Trans_Date,
                    Supplierid = BulOrd.Supplierid,
                    Type = BulOrd.Type,
                    Cheque_No = BulOrd.Cheque_No,
                    Cheque_Date = BulOrd.Cheque_Date,
                    Cheque_Amt = BulOrd.Cheque_Amt,
                    Remarks = BulOrd.Remarks,
                    Narration = BulOrd.Narration,
                    Bankid = BulOrd.Bankid,
                    Companyid = BulOrd.Companyid,
                    Trans_masid = BulOrd.Trans_masid,
                    Advance_Amt = BulOrd.Advance_Amt,
                    Mode = BulOrd.Mode,
                    CreatedBy = BulOrd.CreatedBy,
                };

                var DetList = new List<BIll_Adj_Det>();

                if (BulOrd.Det != null)
                {
                    foreach (var PCompItem in BulOrd.Det)
                    {
                        DetList.Add(new BIll_Adj_Det
                        {
                            Trans_Detid = PCompItem.Trans_Detid,
                            Trans_Masid = PCompItem.Trans_Masid,
                            Type = PCompItem.Type,
                            Pur_Inv_Id = PCompItem.Pur_Inv_Id,
                            Inv_Amount = PCompItem.Inv_Amount,
                            Adj_Amt = PCompItem.Adj_Amt,
                        });
                    }
                }

                var result = repo.Update(MasInsert, DetList);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> Delete(Domain.Bill_Adj_mas BulOrd)
        {

            try
            {
                AxonApparel.Repository.BIll_ADJ_mas MasInsert = new AxonApparel.Repository.BIll_ADJ_mas
                {
                    Trans_Type = BulOrd.Trans_Type,
                    Trans_No = BulOrd.Trans_No,
                    Trans_Date = BulOrd.Trans_Date,
                    Supplierid = BulOrd.Supplierid,
                    Type = BulOrd.Type,
                    Cheque_No = BulOrd.Cheque_No,
                    Cheque_Date = BulOrd.Cheque_Date,
                    Cheque_Amt = BulOrd.Cheque_Amt,
                    Remarks = BulOrd.Remarks,
                    Narration = BulOrd.Narration,
                    Bankid = BulOrd.Bankid,
                    Companyid = BulOrd.Companyid,
                    Trans_masid = BulOrd.Trans_masid,
                    Advance_Amt = BulOrd.Advance_Amt,
                    Mode = BulOrd.Mode,
                    CreatedBy = BulOrd.CreatedBy,
                };

                var DetList = new List<BIll_Adj_Det>();

                if (BulOrd.Det != null)
                {
                    foreach (var PCompItem in BulOrd.Det)
                    {
                        DetList.Add(new BIll_Adj_Det
                        {
                            Trans_Detid = PCompItem.Trans_Detid,
                            Trans_Masid = PCompItem.Trans_Masid,
                            Type = PCompItem.Type,
                            Pur_Inv_Id = PCompItem.Pur_Inv_Id,
                            Inv_Amount = PCompItem.Inv_Amount,
                            Adj_Amt = PCompItem.Adj_Amt,
                        });
                    }
                }

                var result = repo.Delete(MasInsert, DetList);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

    }
}
