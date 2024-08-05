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
    public class ProcessSetupBusiness : IProcessSetupBusiness
    {
        IProcessSetupRepository ProsRep = new ProcessSetupRepository();

        public Response<IEnumerable<Domain.ProcessSetup>> GetProcessSetup()
        {
            try
            {
                var ProsList = ProsRep.GetDataListAll();
                return new Response<IEnumerable<Domain.ProcessSetup>>(ProsList.Select(m => new Domain.ProcessSetup
                {
                    Processid = m.Processid,
                    ProcessSetupid = m.ProcessSetupid,
                    ProcessName = m.ProcessName,
                    CuttingorSewing = m.CuttingorSewing
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.ProcessSetup>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.ProcessSetup> GetDataById(int ProcessSetupid)
        {
            try
            {
                var ProsList = ProsRep.GetDataById(ProcessSetupid);
                return new Response<Domain.ProcessSetup>(new Domain.ProcessSetup
                {
                    Processid = ProsList.Processid,
                    ProcessSetupid = ProsList.ProcessSetupid,
                    ProcessName = "",//ProsList.Process.Process1,
                    CuttingorSewing = ProsList.CuttingorSewing
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch
            {
                return new Response<Domain.ProcessSetup>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateProcessSetup(Domain.ProcessSetup ProcessSetupid)
        {
            try
            {
                //if (string.IsNullOrEmpty(ProcessSetupid.ProcessName)) return new Response<int>(0, Status.ERROR, "Given Process is empty");
                //if (isNameAvailableAlready(ProcessSetupid, "ADD")) return new Response<int>(-1, Status.ERROR, "Given ProcessSetup is already available");

                return new Response<int>(ProsRep.AddData(new AxonApparel.Repository.ProcessSetup
                {
                    Processid = ProcessSetupid.Processid,
                    ProcessSetupid = ProcessSetupid.ProcessSetupid,
                    CuttingorSewing = ProcessSetupid.CuttingorSewing
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateProcessSetup(Domain.ProcessSetup ProcessSetupid)
        {
            //if (isNameAvailableAlready(ProcessSetupid, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given ProcessSetup is already available");

            return new Response<bool>(ProsRep.UpdateData(new AxonApparel.Repository.ProcessSetup
            {
                Processid = ProcessSetupid.Processid,
                ProcessSetupid = ProcessSetupid.ProcessSetupid,
                CuttingorSewing = ProcessSetupid.CuttingorSewing
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteProcessSetup(int ProcessSetupid)
        {
            return new Response<bool>(ProsRep.DeleteData(ProcessSetupid), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.ProcessSetup Prs, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetProcessSetup().Value.Where(c => c.ProcessName.ToUpper() == Prs.ProcessName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetProcessSetup().Value.Where(c => c.ProcessName.ToUpper() == Prs.ProcessName.ToUpper() && c.ProcessSetupid != Prs.ProcessSetupid).ToList().Count > 0);
            }
            return false;

        }


        public Response<Domain.ProcessSetup> GetbyprocessID(int? ProcessId)
        {
            try
            {
                var ProsList = ProsRep.GetbyprocessID(ProcessId);
                return new Response<Domain.ProcessSetup>(new Domain.ProcessSetup
                {
                    Processid = ProsList.Processid,
                    ProcessSetupid = ProsList.ProcessSetupid,
                    ProcessName = "",//ProsList.Process.Process1,
                    CuttingorSewing = ProsList.CuttingorSewing
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch
            {
                return new Response<Domain.ProcessSetup>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

    }
}
