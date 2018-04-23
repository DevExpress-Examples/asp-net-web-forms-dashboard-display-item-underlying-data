<%@ Page Language="vb" AutoEventWireup="true" CodeBehind="Default.aspx.vb" Inherits="ASPxDashboard_RequestUnderlyingData.Default" %>

<%@ Register Assembly="DevExpress.Dashboard.v17.1.Web, Version=17.1.3.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" 
    Namespace="DevExpress.DashboardWeb" TagPrefix="dx" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="detailGrid" style="position:absolute; left:600px; right:0; top:0; bottom:0;"></div>
    <div style="position:absolute; left:0; right:0; top:0; bottom:0;">
        <dx:ASPxDashboard ID="ASPxDashboard1" runat="server" 
            DashboardXmlPath="~/App_Data/dashboard1.xml" 
            WorkingMode="Viewer" 
            ClientInstanceName="webDashboard"
            Height="850px" Width="600px">
            <ClientSideEvents DashboardEndUpdate="function(s, e) { loadUnderlyingData(); }"></ClientSideEvents>
        </dx:ASPxDashboard>
    </div>
    </form>
</body>
</html>
<script type="text/javascript" src="<%=Page.ResolveClientUrl("~/Scripts/UnderlyingData.js")%>"></script>