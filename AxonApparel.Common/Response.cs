using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Common
{

    public class Response<T>
    {
        public Response(T value, Status status, string message)
        {
            Status = status.ToString();
            Message = message;
            Value = value;
        }

        public string Status { get; set; }
        public string Message { get; set; }
        public T Value { get; set; }

        
    }

}
