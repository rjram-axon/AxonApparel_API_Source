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

    public class StyleApprovalTitleBusiness : IStyleApprovalTitleBusiness
    {
        IStyleApprovalTitleRepository AppRep = new StyleApprovalTitleRepository();

        public Response<IQueryable<Domain.BuyOrderStyle>> GetAppmasDetails(int Id)
        {
            try
            {
                var ProductWO = AppRep.GetAppmasDetails(Id);

                return new Response<IQueryable<Domain.BuyOrderStyle>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.BuyOrderStyle>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.Approval>> GetAppDDLdet(int Id)
        {
            try
            {
                var ProductWO = AppRep.GetAppDDLdet(Id);

                return new Response<IQueryable<Domain.Approval>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Approval>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.buyordapptitle>> GetAppEditDetails(string Ordno,int Id)
        {
            try
            {
                var ProductWO = AppRep.GetAppEditDetails(Ordno,Id);

                return new Response<IQueryable<Domain.buyordapptitle>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.buyordapptitle>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> CreateEntry(Domain.buyordapptitle MEntry)
        {
            int? Approvalid = 0;
            string order_no = "";
            string ordertype = "";
            int? TitleId = 0;
            int? Styleid = 0;
           
            try
            {
                var AppList = new List<Repository.buyordapptitle>();

                foreach (var App in MEntry.AppDet)
                {

                    if (App.Approvalid == 0)
                    {
                        Approvalid = null;
                    }
                    else
                    {
                        Approvalid = App.Approvalid;
                    }
                    if (App.order_no == "")
                    {
                        order_no = "";
                    }
                    else
                    {
                        order_no = App.order_no;
                    }
                    if (App.TitleId == 0)
                    {
                        TitleId = null;
                    }
                    else
                    {
                        TitleId = App.TitleId;
                    }
                    if (App.styleid == 0)
                    {
                        Styleid = null;
                    }
                    else
                    {
                        Styleid = App.styleid;
                    }

                    AppList.Add(new Repository.buyordapptitle
                    {
                        Approvalid = (int)Approvalid,
                        order_no = order_no,
                        styleid = (int)Styleid,
                        ordertype = App.ordertype,
                       
                    });

                }

                var result = AppRep.AddData(AppList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateEntry(Domain.buyordapptitle MEntry)
        {
            int? Approvalid = 0;
            string order_no = "";
            string ordertype = "";
            int? TitleId = 0;
            int? Styleid = 0;

            try
            {
                var AppList = new List<Repository.buyordapptitle>();

                foreach (var App in MEntry.AppDet)
                {

                    if (App.Approvalid == 0)
                    {
                        Approvalid = null;
                    }
                    else
                    {
                        Approvalid = App.Approvalid;
                    }
                    if (App.order_no == "")
                    {
                        order_no = "";
                    }
                    else
                    {
                        order_no = App.order_no;
                    }
                    if (App.TitleId == 0)
                    {
                        TitleId = null;
                    }
                    else
                    {
                        TitleId = App.TitleId;
                    }
                    if (App.styleid == 0)
                    {
                        Styleid = null;
                    }
                    else
                    {
                        Styleid = App.styleid;
                    }

                    AppList.Add(new Repository.buyordapptitle
                    {
                        Approvalid = (int)Approvalid,
                        order_no = order_no,
                        styleid = (int)Styleid,
                        ordertype = App.ordertype,
                        TitleId=App.TitleId
                    });

                }

                var result = AppRep.UpdateData(AppList);

                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteEntry(Domain.buyordapptitle MEntry)
        {
            int? Approvalid = 0;
            string order_no = "";
            string ordertype = "";
            int? TitleId = 0;
            int? Styleid = 0;

            try
            {
                var AppList = new List<Repository.buyordapptitle>();

                foreach (var App in MEntry.AppDet)
                {

                    if (App.Approvalid == 0)
                    {
                        Approvalid = null;
                    }
                    else
                    {
                        Approvalid = App.Approvalid;
                    }
                    if (App.order_no == "")
                    {
                        order_no = "";
                    }
                    else
                    {
                        order_no = App.order_no;
                    }
                    if (App.TitleId == 0)
                    {
                        TitleId = null;
                    }
                    else
                    {
                        TitleId = App.TitleId;
                    }
                    if (App.styleid == 0)
                    {
                        Styleid = null;
                    }
                    else
                    {
                        Styleid = App.styleid;
                    }

                    AppList.Add(new Repository.buyordapptitle
                    {
                        Approvalid = (int)Approvalid,
                        order_no = order_no,
                        styleid = (int)Styleid,
                        ordertype = App.ordertype,
                        TitleId = App.TitleId
                    });

                }

                var result = AppRep.DeleteData(AppList);

                return new Response<bool>(result, Status.SUCCESS, "Deleted Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
