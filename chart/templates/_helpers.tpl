{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "sonarqube.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Set sonarqube.webcontext, ensuring it starts and ends with a slash, in order to ease probes url template
*/}}
{{- define "sonarqube.monitorcontext" -}}
{{- $tempWebcontext := .Values.upstream.sonarWebContext -}}
{{- if and .Values.upstream.sonarProperties (hasKey (.Values.upstream.sonarProperties) "sonar.web.context") -}}
{{- $tempWebcontext = (get .Values.upstream.sonarProperties "sonar.web.context") -}}
{{- end -}}
{{- range $index, $val := .Values.upstream.env -}}
{{- if eq $val.name "SONAR_WEB_CONTEXT" -}}
{{- $tempWebcontext = $val.value -}}
{{- end -}}
{{- end -}}
{{- if not (hasPrefix "/" $tempWebcontext) -}}
{{- $tempWebcontext = print "/" $tempWebcontext -}}
{{- end -}}
{{- if not (hasSuffix "/" $tempWebcontext) -}}
{{- $tempWebcontext = print $tempWebcontext "/" -}}
{{- end -}}
{{ printf "%s" $tempWebcontext }}
{{- end -}}