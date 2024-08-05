CREATE TABLE [dbo].[ExceptionLogg]
(
	[Logid] [bigint] IDENTITY(1,1) NOT NULL,  
    [ExceptionMsg] [varchar](250) NULL,  
    [ExceptionType] [varchar](100) NULL,  
    [ExceptionSource] [nvarchar](max) NULL,  
    [ExceptionURL] [varchar](100) NULL,  
    [Logdate] [datetime] NULL,
	CONSTRAINT [PK_Error_Logid] PRIMARY KEY ([Logid])
)
