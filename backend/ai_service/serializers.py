from rest_framework import serializers

class DiseaseDetectionSerializer(serializers.Serializer):
    image = serializers.ImageField()

class DetectionResultSerializer(serializers.Serializer):
    disease_name = serializers.CharField()
    severity = serializers.CharField()
    treatment_chemical = serializers.CharField()
    treatment_organic = serializers.CharField()
    prevention_steps = serializers.ListField(child=serializers.CharField())
